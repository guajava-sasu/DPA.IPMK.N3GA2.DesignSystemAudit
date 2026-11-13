#!/usr/bin/env node
// Suivi des évolutions du Figma AMF : détecte ce qui change entre la version de référence (instantané versionné dans
// figma/instantane.json) et un nouvel export .fig, écrit un rapport, puis applique ce qui peut l'être.
//
//   node scripts/amf-figma.mjs comparer <nouveau.fig>   rapport dans figma/rapports/, rien d'autre ne change
//   node scripts/amf-figma.mjs appliquer <nouveau.fig>  rapport, puis amf-tokens.css régénéré, instantané mis à jour
//                                                       et audit des contrastes ; n'écrit rien si un jeton supprimé
//                                                       ou renommé est encore utilisé dans le dépôt (sauf --force)
//   node scripts/amf-figma.mjs instantane [fichier.fig] (ré)écrit l'instantané de référence sans rien comparer
//                                                       (sans argument : le .fig nommé dans l'instantané actuel)
//
// Options : --reference <instantane.json> (défaut figma/instantane.json) ; --rapport <fichier.md> (défaut
// figma/rapports/<date d'export>.md, suffixé -2, -3… s'il existe déjà avec un autre contenu ; pas de rapport
// s'il n'y a aucune différence) ; --force (appliquer malgré des jetons encore utilisés) ; --sortie-css
// <fichier.css> (essais : écrit ailleurs que dans le dépôt, l'audit des contrastes est alors sauté) ; --sans-audit.
// <nouveau.fig> peut aussi être un instantané .json pour comparer (pas pour appliquer).
// Ce qui reste manuel : les composants (CSS des fichiers tokens/amf-*.css, exemples de la vitrine) et la conformité
// au journal ; le rapport les liste calque par calque. Aucune dépendance : Node ≥ 22.15.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, resolve, relative, join, basename, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { lireFig } from './figma/lire-fig.mjs';
import { extraireJetons } from './figma/jetons.mjs';
import { construireInstantane, verifierInstantane, figDeReference } from './figma/instantane.mjs';
import { comparer, rapportMarkdown, nombreDeDifferences } from './figma/comparer.mjs';

const racine = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CSS_DEPOT = join(racine, 'projects/amf-design-system/tokens/amf-tokens.css');
const CONTRASTES_GENERES = join(racine, 'projects/showcase/src/app/audit/contrastes.generated.ts');
const versDepot = (p) => relative(racine, p).split(sep).join('/');

function usage(code) {
  const lignes = readFileSync(fileURLToPath(import.meta.url), 'utf8')
    .split('\n')
    .slice(1);
  const aide = lignes.slice(
    0,
    lignes.findIndex((l) => !l.startsWith('//')),
  );
  console.log(aide.map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
  process.exit(code);
}

let options, commande, cible;
try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      reference: { type: 'string' },
      rapport: { type: 'string' },
      'sortie-css': { type: 'string' },
      'sans-audit': { type: 'boolean' },
      force: { type: 'boolean' },
      aide: { type: 'boolean', short: 'h' },
    },
  });
  options = values;
  [commande, cible] = positionals;
  if (values.aide) usage(0);
  if (positionals.length > 2) throw new Error(`argument en trop : ${positionals[2]}`);
} catch (e) {
  console.error(`amf-figma : ${e.message}\n`);
  usage(2);
}
const cheminReference = resolve(options.reference ?? join(racine, 'figma/instantane.json'));
const SORTIE_CSS = resolve(options['sortie-css'] ?? CSS_DEPOT);

function charger(chemin) {
  const p = resolve(chemin);
  if (!existsSync(p) || !statSync(p).isFile()) throw new Error(`${p} introuvable`);
  if (p.endsWith('.json')) return { instantane: verifierInstantane(lireJson(p), p) };
  const { meta, message } = lireFig(p);
  return { instantane: construireInstantane(message, meta, p), meta, message, source: p };
}

function lireJson(p) {
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch (e) {
    throw new Error(`${p} : JSON illisible (${e.message})`);
  }
}

const ecrireJson = (p, o) => {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, `${JSON.stringify(o, null, 1)}\n`);
};

// Fichiers du dépôt où chercher les jetons utilisés (le fichier généré, l'outil, ses sorties et son guide, dont les
// exemples citent des jetons, sont exclus)
function fichiersDuDepot() {
  const out = [];
  const exclus = /(^|\/)(node_modules|dist|\.angular|\.git|figma)(\/|$)/;
  const marcher = (d) => {
    if (!existsSync(d)) return;
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (exclus.test(versDepot(p))) continue;
      if (statSync(p).isDirectory()) marcher(p);
      else if (
        /\.(css|ts|html|mjs|md)$/.test(n) &&
        !/amf-tokens\.css$|\.generated\.ts$|^suivi-figma.*\.md$/.test(n)
      )
        out.push(p);
    }
  };
  for (const d of ['projects', 'docs', 'scripts']) marcher(join(racine, d));
  return out;
}

// Usages d'une liste de jetons : citations du nom complet, et noms construits par morceaux (un fichier qui cite le
// préfixe --amf-background- et, entre guillemets, la chaîne surface-subtle construit le jeton complet)
function usagesJetons(noms) {
  const usages = new Map(noms.map((n) => [n, []]));
  const construits = new Map(noms.map((n) => [n, []]));
  if (!noms.length) return { usages, construits };
  const echappe = (t) => t.replace(/[-]/g, '\\-');
  const motif = new RegExp(`(${noms.map(echappe).join('|')})(?![\\w-])`, 'g');
  const morceaux = noms.flatMap((nom) => {
    const m = /^(--amf-[a-z0-9]+-)(.+)$/.exec(nom);
    return m ? [{ nom, prefixe: m[1], suffixe: new RegExp(`['"\`]${echappe(m[2])}['"\`]`) }] : [];
  });
  for (const f of fichiersDuDepot()) {
    const texte = readFileSync(f, 'utf8');
    const candidats = morceaux.filter((x) => texte.includes(x.prefixe));
    texte.split('\n').forEach((l, i) => {
      const ou = `${versDepot(f)}:${i + 1}`;
      for (const m of l.matchAll(motif)) usages.get(m[1]).push(ou);
      for (const x of candidats) if (x.suffixe.test(l)) construits.get(x.nom).push(ou);
    });
  }
  for (const m of [usages, construits]) for (const [n, l] of m) m.set(n, [...new Set(l)]);
  return { usages, construits };
}

// Pages de la vitrine dont la référence Figma cite le composant ou sa page
function pagesVitrine() {
  const f = join(racine, 'projects/showcase/src/app/pages/pages.ts');
  if (!existsSync(f)) return () => [];
  const src = readFileSync(f, 'utf8');
  const pages = [...src.matchAll(/id: '([^']+)',[\s\S]*?figma:\s*['"]([^'"]*)['"]/g)].map((m) => ({
    id: m[1],
    figma: m[2].toLowerCase(),
  }));
  const propre = (s) =>
    s
      .replace(/[\u{1F000}-\u{1FFFF}☀-➿️]/gu, '')
      .trim()
      .toLowerCase();
  return (nom, page) => {
    const candidats = [propre(page), propre(nom)].filter((s) => s.length > 2);
    return pages.filter((p) => candidats.some((c) => p.figma.includes(c))).map((p) => p.id);
  };
}

// Rapport par défaut : figma/rapports/<date d'export>.md. Un rapport existant qui compare la même référence à la même
// version (relance de comparer, puis appliquer) est remplacé par le plus récent ; un rapport d'une autre comparaison
// n'est pas écrasé (suffixe -2, -3…)
function cheminRapport(neuf, contenu) {
  if (options.rapport) return resolve(options.rapport);
  const date = (neuf.source.exporte_le ?? 'sans-date').slice(0, 10);
  const base = join(racine, 'figma/rapports', date);
  const sources = (t) =>
    t
      .split('\n')
      .filter((l) => /^- (Référence|Nouvelle version) : /.test(l))
      .join('\n');
  let p = `${base}.md`;
  for (let i = 2; existsSync(p) && sources(readFileSync(p, 'utf8')) !== sources(contenu); i++)
    p = `${base}-${i}.md`;
  return p;
}

function rapport(ref, neuf, cheminFig) {
  const r = comparer(ref, neuf);
  const { usages, construits } = usagesJetons([
    ...r.jetons.supprimes.map((x) => x.nom),
    ...r.jetons.renommes.map((x) => x.de),
  ]);
  const n = nombreDeDifferences(r);
  const j = r.jetons;
  console.log(
    `${n} différence(s) : jetons +${j.ajoutes.length} −${j.supprimes.length} ~${j.modifies.length} (renommés ${j.renommes.length}) ; ` +
      `pages +${r.pages.ajoutees.length} −${r.pages.supprimees.length} ~${r.pages.renommees.length} ; ` +
      `composants +${r.composants.ajoutes.length} −${r.composants.supprimes.length} ~${r.composants.modifies.length} ; ` +
      `journal +${r.journal.nouvelles.length} −${r.journal.retirees.length} ~${r.journal.modifiees.length}`,
  );
  if (!n) {
    console.log('Aucun rapport écrit : rien à reporter.');
    return { r, usages, construits };
  }
  const md = rapportMarkdown(r, {
    usagesJetons: usages,
    usagesConstruits: construits,
    pagesVitrine: pagesVitrine(),
    commandeAppliquer: `node scripts/amf-figma.mjs appliquer "${cheminFig.endsWith('.json') ? '<fichier .fig de cette version>' : cheminFig}"`,
  });
  const sortie = cheminRapport(neuf, `${md}\n`);
  mkdirSync(dirname(sortie), { recursive: true });
  writeFileSync(sortie, `${md}\n`);
  console.log(`Rapport : ${relative(process.cwd(), sortie)}`);
  return { r, usages, construits };
}

try {
  if (commande === 'instantane') {
    const { instantane } = charger(cible ?? figDeReference(racine, cheminReference));
    ecrireJson(cheminReference, instantane);
    console.log(
      `Instantané : ${relative(process.cwd(), cheminReference)} (${instantane.source.fichier}, export du ${instantane.source.exporte_le})`,
    );
  } else if (commande === 'comparer' || commande === 'appliquer') {
    if (!cible) usage(2);
    if (commande === 'appliquer' && cible.endsWith('.json'))
      throw new Error(
        'appliquer demande un fichier .fig (un instantané .json ne suffit pas pour générer les jetons)',
      );
    if (!existsSync(cheminReference))
      throw new Error(
        `${cheminReference} absent : lancer d'abord « node scripts/amf-figma.mjs instantane <fichier.fig> » sur la version de référence`,
      );
    const ref = verifierInstantane(lireJson(cheminReference), cheminReference);
    const neuf = charger(cible);
    const { r, usages, construits } = rapport(ref, neuf.instantane, cible);
    if (commande === 'appliquer') {
      const casses = [...usages.keys()].filter(
        (n) => usages.get(n).length || construits.get(n).length,
      );
      if (casses.length) {
        console.error(`\n${casses.length} jeton(s) supprimé(s) ou renommé(s) encore utilisé(s) :`);
        for (const n of casses)
          console.error(
            `  ${n} : ${[...usages.get(n), ...construits.get(n).map((x) => `${x} (nom construit)`)].join(', ')}`,
          );
        if (!options.force) {
          console.error(
            '\nRien n’a été écrit (amf-tokens.css et instantané inchangés) : remplacer ces jetons, ou relancer avec --force.',
          );
          process.exit(1);
        }
      }
      const { css, jetons, modesIgnores } = extraireJetons(neuf.message, neuf.meta, neuf.source);
      const lire = (p) => (existsSync(p) ? readFileSync(p) : null);
      const avant = {
        css: lire(SORTIE_CSS),
        reference: readFileSync(cheminReference),
        audit: lire(CONTRASTES_GENERES),
      };
      writeFileSync(SORTIE_CSS, css);
      console.log(`${relative(process.cwd(), SORTIE_CSS)} : ${jetons.size} jetons`);
      if (modesIgnores.length)
        console.warn(
          `Mode(s) non générés dans le CSS : ${modesIgnores.join(', ')} (à reporter à la main)`,
        );
      ecrireJson(cheminReference, neuf.instantane);
      console.log(`Instantané de référence mis à jour (${basename(neuf.source)})`);
      let audit = { status: 0 };
      if (options['sans-audit']) console.log('Audit des contrastes sauté (--sans-audit).');
      else if (SORTIE_CSS !== CSS_DEPOT)
        console.log('Audit des contrastes sauté : --sortie-css écrit hors du dépôt.');
      else
        audit = spawnSync(process.execPath, [join(racine, 'scripts/audit-contrastes.mjs')], {
          stdio: 'inherit',
        });
      const manuel =
        r.composants.ajoutes.length + r.composants.supprimes.length + r.composants.modifies.length;
      const journal = r.journal.nouvelles.length + r.journal.modifiees.length;
      if (manuel || journal)
        console.log(
          `\nReste à reporter à la main : ${manuel} composant(s), ${journal} entrée(s) du journal (voir le rapport).`,
        );
      if (audit.status !== 0) {
        if (options.force) {
          console.warn(
            '\nAudit des contrastes en échec ; nouvelle version gardée (--force). npm run build restera bloqué par l’audit tant que l’écart existe.',
          );
        } else {
          if (avant.css) writeFileSync(SORTIE_CSS, avant.css);
          writeFileSync(cheminReference, avant.reference);
          if (avant.audit) writeFileSync(CONTRASTES_GENERES, avant.audit);
          console.error(
            '\nAudit des contrastes en échec : amf-tokens.css, l’instantané et le résultat de l’audit sont remis dans leur état précédent (le rapport reste). Corriger, puis relancer appliquer ; --force garde la nouvelle version malgré l’audit.',
          );
          process.exit(1);
        }
      }
    }
  } else usage(commande ? 2 : 0);
} catch (e) {
  console.error(`amf-figma : ${e.message}`);
  process.exit(1);
}
