// Jetons du design system AMF depuis le message décodé d'un .fig (voir lire-fig.mjs) : primitives, sémantiques,
// dimensions (modes Default et Rounded), styles de texte, ombres « Dropshadow ». Utilisé par amf-jetons.mjs
// (génération de amf-tokens.css) et par amf-figma.mjs (comparaison entre deux versions du Figma).

import { basename } from 'node:path';

/** Nom CSS d'une variable Figma : « Background/Surface Subtle » → --amf-background-surface-subtle */
export const slugJeton = (nom) =>
  nom
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
export const nomCss = (nom) => `--amf-${slugJeton(nom)}`;

/**
 * Les modes autres que Default/Value et Rounded (un futur mode sombre, par exemple) ne sont pas écrits dans le CSS :
 * leurs valeurs sont rendues dans `jetons` (champ modes) pour la comparaison et leurs noms dans `modesIgnores`.
 * @returns {{ css: string, dtcg: object, jetons: Map<string, { defaut: string, rounded?: string,
 *   modes?: Record<string, string> }>, modesIgnores: string[] }}
 */
export function extraireJetons(message, meta, source) {
  const noeuds = message.nodeChanges;
  const gid = (g) => `${g.sessionID}:${g.localID}`;
  const actif = (n) => !n.isSoftDeleted;
  const COLLECTIONS = ['AMF Primitives', 'AMF Semantic', 'AMF Dimensions'];

  const jeux = new Map(
    noeuds.filter((n) => n.type === 'VARIABLE_SET' && actif(n)).map((n) => [gid(n.guid), n]),
  );
  const variables = noeuds.filter(
    (n) => n.type === 'VARIABLE' && actif(n) && n.variableSetID?.guid,
  );
  const parId = new Map(variables.map((v) => [gid(v.guid), v]));
  const slug = slugJeton;
  const css = nomCss;
  const hexa = (c) => {
    const h = (x) =>
      Math.round(x * 255)
        .toString(16)
        .padStart(2, '0');
    return `#${h(c.r)}${h(c.g)}${h(c.b)}${c.a < 0.999 ? h(c.a) : ''}`;
  };
  const nombre = (x) => +x.toFixed(3);

  function valeurCss(donnee, type) {
    const v = donnee?.value ?? {};
    if (v.alias) {
      const cible = v.alias.guid && parId.get(gid(v.alias.guid));
      if (!cible) throw new Error(`alias non résolu : ${JSON.stringify(v.alias)}`);
      return { css: `var(${css(cible.name)})`, dtcg: `{${cible.name.replaceAll('/', '.')}}` };
    }
    if (v.colorValue) {
      const h = hexa(v.colorValue);
      return { css: h, dtcg: h };
    }
    if (v.floatValue !== undefined) {
      const px = `${nombre(v.floatValue)}px`;
      return { css: type === 'FLOAT' ? px : String(v.floatValue), dtcg: px };
    }
    throw new Error(`valeur non gérée : ${JSON.stringify(v)}`);
  }

  const blocs = { root: [], rounded: [] };
  const autresModes = new Map();
  const modesIgnores = new Set();
  const dtcg = { $description: `Généré par scripts/amf-jetons.mjs depuis « ${basename(source)} »` };
  const ajouterDtcg = (nom, feuille) => {
    const p = nom.split('/');
    let d = dtcg;
    for (const k of p.slice(0, -1)) d = d[k] ??= {};
    d[p.at(-1)] = feuille;
  };

  for (const nomCollection of COLLECTIONS) {
    const jeu = [...jeux.values()].find((j) => j.name === nomCollection);
    if (!jeu) throw new Error(`collection « ${nomCollection} » absente du fichier`);
    const modes = new Map(jeu.variableSetModes.map((m) => [gid(m.id), m.name]));
    const vars = variables
      .filter((v) => gid(v.variableSetID.guid) === gid(jeu.guid))
      .sort((a, b) =>
        a.sortPosition < b.sortPosition ? -1 : a.sortPosition > b.sortPosition ? 1 : 0,
      );
    blocs.root.push(`\n  /* ${nomCollection} (${vars.length}) */`);
    for (const v of vars) {
      const parMode = new Map(
        v.variableDataValues.entries.map((e) => [
          modes.get(gid(e.modeID)),
          valeurCss(e.variableData, v.variableResolvedType),
        ]),
      );
      const [premier] = parMode.values();
      const defaut = parMode.get('Default') ?? parMode.get('Value') ?? premier;
      blocs.root.push(`  ${css(v.name)}: ${defaut.css};`);
      const arrondi = parMode.get('Rounded');
      if (arrondi && arrondi.css !== defaut.css)
        blocs.rounded.push(`  ${css(v.name)}: ${arrondi.css};`);
      for (const [mode, val] of parMode) {
        if (['Default', 'Value', 'Rounded'].includes(mode) || val === defaut) continue;
        modesIgnores.add(`${nomCollection} › ${mode}`);
        if (val.css === defaut.css) continue;
        if (!autresModes.has(css(v.name))) autresModes.set(css(v.name), {});
        autresModes.get(css(v.name))[mode] = val.css;
      }
      ajouterDtcg(v.name, {
        $type: v.variableResolvedType === 'COLOR' ? 'color' : 'dimension',
        $value: defaut.dtcg,
      });
    }
  }

  // Styles de texte (hors styles hérités v-text / v-icon) et ombres
  const graisse = {
    Thin: 100,
    Light: 300,
    Regular: 400,
    Italic: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    Black: 900,
  };
  const textes = new Map();
  for (const n of noeuds) {
    if (n.styleType !== 'TEXT' || !actif(n) || /^v-/.test(n.name) || textes.has(slug(n.name)))
      continue;
    textes.set(slug(n.name), n);
  }
  blocs.root.push(`\n  /* Styles de texte (${textes.size}) */`);
  for (const [s, n] of textes) {
    const lh = n.lineHeight ?? {},
      ls = n.letterSpacing ?? {};
    blocs.root.push(
      `  --amf-text-${s}-family: '${n.fontName.family}';`,
      `  --amf-text-${s}-size: ${nombre(n.fontSize)}px;`,
      `  --amf-text-${s}-line-height: ${lh.units === 'PIXELS' ? `${nombre(lh.value)}px` : lh.units === 'PERCENT' ? `${nombre(lh.value)}%` : 'normal'};`,
      `  --amf-text-${s}-weight: ${graisse[n.fontName.style] ?? 400};`,
      `  --amf-text-${s}-letter-spacing: ${ls.units === 'PIXELS' ? `${nombre(ls.value)}px` : `${nombre((ls.value ?? 0) / 100)}em`};`,
      ...(n.textCase === 'UPPER' ? [`  --amf-text-${s}-transform: uppercase;`] : []),
    );
  }
  const ombres = new Map();
  for (const n of noeuds) {
    const m = /^Dropshadow - (Lv\d)$/.exec(n.name ?? '');
    if (n.styleType !== 'EFFECT' || !actif(n) || !m || ombres.has(m[1])) continue;
    ombres.set(
      m[1],
      n.effects
        .filter((e) => e.type === 'DROP_SHADOW')
        .map(
          (e) =>
            `${nombre(e.offset.x)}px ${nombre(e.offset.y)}px ${nombre(e.radius)}px ${nombre(e.spread ?? 0)}px ${hexa(e.color)}`,
        )
        .join(', '),
    );
  }
  blocs.root.push(`\n  /* Élévation (${ombres.size}) */`);
  for (const [niveau, valeur] of [...ombres].sort())
    blocs.root.push(`  --amf-shadow-${niveau.toLowerCase()}: ${valeur};`);

  const entete = `/*
 * Jetons du design system AMF, GÉNÉRÉS : ne pas modifier à la main.
 *   Source : ${basename(source)} (export Figma du ${meta.exported_at ?? 'inconnu'})
 *   Commande : node scripts/amf-figma.mjs appliquer "<fichier.fig>" (ou node scripts/amf-jetons.mjs "<fichier.fig>")
 * Mode Default des dimensions sur :root ; mode Rounded (boutons en pilule) sous .amf-rounded.
 */
`;
  const jetons = new Map();
  for (const l of blocs.root) {
    const m = /^  (--[\w-]+): (.*);$/.exec(l);
    if (m) jetons.set(m[1], { defaut: m[2] });
  }
  for (const l of blocs.rounded) {
    const m = /^  (--[\w-]+): (.*);$/.exec(l);
    if (m) jetons.get(m[1]).rounded = m[2];
  }
  for (const [nom, modes] of autresModes) if (jetons.has(nom)) jetons.get(nom).modes = modes;
  const texte = `${entete}:root {${blocs.root.join('\n')}\n}\n\n.amf-rounded {\n${blocs.rounded.join('\n')}\n}\n`;
  return { css: texte, dtcg, jetons, modesIgnores: [...modesIgnores] };
}
