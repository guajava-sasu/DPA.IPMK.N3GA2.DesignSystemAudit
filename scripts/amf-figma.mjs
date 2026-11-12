#!/usr/bin/env node
// Suivi des évolutions du Figma AMF : détecte ce qui change entre la version de référence (instantané versionné dans
// figma/instantane.json) et un nouvel export .fig, écrit un rapport, puis applique ce qui peut l'être.
//
//   node scripts/amf-figma.mjs comparer <nouveau.fig>   rapport dans figma/rapports/, rien d'autre ne change
//   node scripts/amf-figma.mjs appliquer <nouveau.fig>  rapport, puis amf-tokens.css régénéré, instantané mis à jour
//                                                       et audit des contrastes ; n'écrit rien si un jeton supprimé
//                                                       ou renommé est encore utilisé dans le dépôt (sauf --force)
//   node scripts/amf-figma.mjs instantane [fichier.fig] (ré)écrit l'instantané de référence sans rien comparer
//
// Options : --reference <instantane.json> (défaut figma/instantane.json) ; --rapport <fichier.md> (défaut
// figma/rapports/<date d'export>.md, suffixé -2, -3… s'il existe déjà ; pas de rapport s'il n'y a aucune
// différence) ; --force (appliquer malgré des jetons encore utilisés) ; --sortie-css <fichier.css> (essais : écrit
// ailleurs que dans le dépôt, l'audit des contrastes est alors sauté) ; --sans-audit.
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
import { construireInstantane, verifierInstantane } from './figma/instantane.mjs';
import { comparer, rapportMarkdown, nombreDeDifferences } from './figma/comparer.mjs';

const racine = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FIG_DEFAUT = resolve(racine, '..', 'AMF Design System [v2.0].fig');
const CSS_DEPOT = join(racine, 'projects/amf-design-system/tokens/amf-tokens.css');
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

// Fichiers du dépôt où chercher les jetons utilisés (le fichier généré, l'outil et ses sorties sont exclus)
function fichiersDuDepot() {
  const out = [];
  const exclus = /(^|\/)(node_modules|dist|\.angular|\.git|figma)(\/|$)/;
  const marcher = (d) => {
    if (!existsSync(d)) return;
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (exclus.test(versDepot(p))) continue;
      if (statSync(p).isDirectory()) marcher(p);
      else if (/\.(css|ts|html|mjs|md)$/.test(n) && !/amf-tokens\.css$|\.generated\.ts$/.test(n))
        out.push(p);
    }
  };
  for (const d of ['projects', 'docs', 'scripts']) marcher(join(racine, d));
  return out;
}

function usagesJetons(noms) {
  const res = new Map(noms.map((n) => [n, []]));
  if (!noms.length) return res;
  const motif = new RegExp(
    `(${noms.map((n) => n.replace(/[-]/g, '\\-')).join('|')})(?![\\w-])`,
    'g',
  );
  for (const f of fichiersDuDepot()) {
    const lignes = readFileSync(f, 'utf8').split('\n');
    lignes.forEach((l, i) => {
      for (const m of l.matchAll(motif)) res.get(m[1]).push(`${versDepot(f)}:${i + 1}`);
    });
  }
  for (const [n, l] of res) res.set(n, [...new Set(l)]);
  return res;
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

function cheminRapport(neuf) {
  if (options.rapport) return resolve(options.rapport);
  const date = (neuf.source.exporte_le ?? 'sans-date').slice(0, 10);
  const base = join(racine, 'figma/rapports', date);
  let p = `${base}.md`;
  for (let i = 2; existsSync(p); i++) p = `${base}-${i}.md`;
  return p;
}

function rapport(ref, neuf, cheminFig) {
  const r = comparer(ref, neuf);
  const usages = usagesJetons([
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
    return { r, usages };
  }
  const md = rapportMarkdown(r, {
    usagesJetons: usages,
    pagesVitrine: pagesVitrine(),
    commandeAppliquer: `node scripts/amf-figma.mjs appliquer "${cheminFig}"`,
  });
  const sortie = cheminRapport(neuf);
  mkdirSync(dirname(sortie), { recursive: true });
  writeFileSync(sortie, `${md}\n`);
  console.log(`Rapport : ${relative(process.cwd(), sortie)}`);
  return { r, usages };
}

try {
  if (commande === 'instantane') {
    const { instantane } = charger(cible ?? FIG_DEFAUT);
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
    const { r, usages } = rapport(ref, neuf.instantane, cible);
    if (commande === 'appliquer') {
      const casses = [...usages].filter(([, l]) => l.length);
      if (casses.length) {
        console.error(`\n${casses.length} jeton(s) supprimé(s) ou renommé(s) encore utilisé(s) :`);
        for (const [n, l] of casses) console.error(`  ${n} : ${l.join(', ')}`);
        if (!options.force) {
          console.error(
            '\nRien n’a été écrit (amf-tokens.css et instantané inchangés) : remplacer ces jetons, ou relancer avec --force.',
          );
          process.exit(1);
        }
      }
      const { css, jetons, modesIgnores } = extraireJetons(neuf.message, neuf.meta, neuf.source);
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
      if (audit.status !== 0) process.exit(1);
    }
  } else usage(commande ? 2 : 0);
} catch (e) {
  console.error(`amf-figma : ${e.message}`);
  process.exit(1);
}
