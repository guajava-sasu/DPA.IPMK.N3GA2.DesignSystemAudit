#!/usr/bin/env node
/*
 * Audit des contrastes du thème galma-ui, en clair (AMF) et en sombre (proposition galma-ui).
 * Lit les jetons CSS (amf-tokens.css généré + galma-theme.css), résout les var(), compose les couleurs
 * translucides sur leur fond, et calcule le ratio WCAG 2.1 de chaque paire d'usage des composants.
 * Seuils AMF (journal du Figma, 12/09/2026) : texte 4,5:1 ; bordures de champ, focus et éléments graphiques 3:1.
 * Calcule aussi le score APCA (Lc, indicatif : le RGAA s'appuie sur WCAG).
 *
 *   node scripts/audit-contrastes.mjs            → écrit le rapport, code de sortie 1 si une paire échoue
 *   node scripts/audit-contrastes.mjs --sans-echec
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const jetons = join(racine, 'projects/galma-ui/tokens');
const css =
  readFileSync(join(jetons, 'amf-tokens.css'), 'utf8') +
  '\n' +
  readFileSync(join(jetons, 'galma-theme.css'), 'utf8') +
  '\n' +
  readFileSync(join(jetons, 'galma-messages.css'), 'utf8') +
  '\n' +
  readFileSync(join(jetons, 'galma-structure.css'), 'utf8');

function blocs(selecteur) {
  const vars = {};
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css.replace(/\/\*[\s\S]*?\*\//g, '')))) {
    if (m[1].trim() !== selecteur) continue;
    for (const d of m[2].split(';')) {
      const i = d.indexOf(':');
      if (i < 0) continue;
      const k = d.slice(0, i).trim();
      if (k.startsWith('--')) vars[k] = d.slice(i + 1).trim();
    }
  }
  return vars;
}
const clair = blocs(':root');
const sombre = { ...clair, ...blocs(':root.dark') };

function resoudre(vars, nom, pile = []) {
  const v = vars[nom];
  if (v === undefined) throw new Error(`jeton inconnu ${nom} (${pile.join(' → ')})`);
  const m = /^var\((--[\w-]+)\)$/.exec(v);
  return m ? resoudre(vars, m[1], [...pile, nom]) : v;
}
function rgba(txt) {
  let m = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(txt);
  if (m)
    return [0, 2, 4]
      .map((i) => parseInt(m[1].slice(i, i + 2), 16))
      .concat(m[2] ? parseInt(m[2], 16) / 255 : 1);
  m = /^#([0-9a-f]{3})$/i.exec(txt);
  if (m) return [...m[1]].map((c) => parseInt(c + c, 16)).concat(1);
  m = /^rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)\s*(?:[/,]\s*([\d.]+%?))?\s*\)$/.exec(txt);
  if (m) {
    const a =
      m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return [+m[1], +m[2], +m[3], a];
  }
  throw new Error(`couleur illisible : ${txt}`);
}
const composer = (haut, bas) =>
  [0, 1, 2].map((i) => haut[i] * haut[3] + bas[i] * (1 - haut[3])).concat(1);
const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
// APCA 0.0.98G-4g (W3C Silver, indicatif)
function apca(txt, fond) {
  const y = ([r, g, b]) =>
    0.2126729 * (r / 255) ** 2.4 + 0.7151522 * (g / 255) ** 2.4 + 0.072175 * (b / 255) ** 2.4;
  const clamp = (v) => (v > 0.022 ? v : v + (0.022 - v) ** 1.414);
  const yt = clamp(y(txt)),
    yb = clamp(y(fond));
  let c;
  if (yb > yt) c = (yb ** 0.56 - yt ** 0.57) * 1.14;
  else c = (yb ** 0.65 - yt ** 0.62) * 1.14;
  if (Math.abs(c) < 0.1) return 0;
  return Math.round((c > 0 ? c - 0.027 : c + 0.027) * 100);
}
const hex = (c) =>
  '#' +
  c
    .slice(0, 3)
    .map((v) => Math.round(v).toString(16).padStart(2, '0'))
    .join('');

/* Paires d'usage : [groupe, texte|graphique, avant-plan, fond, sous-fond (si fond translucide), usage] */
const P = [];
const T = (g, fg, bg, usage, sous = '--amf-background-surface') =>
  P.push({ groupe: g, type: 'texte', fg, bg, sous, usage });
const G = (g, fg, bg, usage, sous = '--amf-background-surface') =>
  P.push({ groupe: g, type: 'graphique', fg, bg, sous, usage });
for (const bg of ['page', 'surface', 'surface-subtle']) {
  T('Textes', '--amf-foreground-primary', `--amf-background-${bg}`, `Texte principal sur ${bg}`);
  T(
    'Textes',
    '--amf-foreground-secondary',
    `--amf-background-${bg}`,
    `Texte secondaire, aide sur ${bg}`,
  );
}
T(
  'Textes',
  '--amf-foreground-placeholder',
  '--amf-background-surface',
  'Texte indicatif d’un champ',
);
T('Textes', '--amf-foreground-brand', '--amf-background-surface', 'Onglet actif, texte de marque');
T('Textes', '--amf-foreground-link', '--amf-background-surface', 'Lien');
T('Textes', '--amf-foreground-inverse', '--amf-background-inverse', 'Texte inversé (infobulle)');
T(
  'Textes',
  '--amf-feedback-error-foreground',
  '--amf-background-surface',
  'Message d’erreur sous un champ',
);
for (const c of ['primary', 'secondary', 'neutral', 'error']) {
  const nom = {
    primary: 'Primaire',
    secondary: 'Secondaire',
    neutral: 'Neutre',
    error: 'Destructive',
  }[c];
  for (const e of ['default', 'hover', 'pressed'])
    T(
      `Actions ${nom}`,
      '--amf-foreground-on-primary',
      `--amf-action-${c}-${e}`,
      `Bouton Filled ${e}`,
    );
  T(
    `Actions ${nom}`,
    `--amf-action-${c}-foreground`,
    '--amf-background-surface',
    'Bouton Outlined / Text',
  );
  T(
    `Actions ${nom}`,
    `--amf-action-${c}-foreground`,
    `--amf-action-${c}-subtle`,
    'Bouton Outlined / Text au survol',
  );
  T(
    `Actions ${nom}`,
    `--amf-action-${c}-foreground`,
    `--amf-action-${c}-subtle-hover`,
    'Bouton Outlined / Text à l’appui',
  );
  if (c !== 'error')
    G(
      `Actions ${nom}`,
      `--amf-action-${c}-default`,
      '--amf-background-surface',
      'Case cochée, interrupteur, sélection',
    );
}
T(
  'Actions Primaire',
  '--amf-action-primary-on-tint',
  '--amf-action-primary-tint',
  'Ligne sélectionnée (Tint)',
);
T(
  'Actions Secondaire',
  '--amf-action-secondary-on-tint',
  '--amf-action-secondary-tint',
  'Ligne sélectionnée (Tint)',
);
for (const t of ['info', 'success', 'warning', 'error', 'neutral']) {
  T('Feedback', `--amf-feedback-${t}-foreground`, `--amf-feedback-${t}-background`, `Badge ${t}`);
  T('Feedback', `--amf-feedback-${t}-on-solid`, `--amf-feedback-${t}-solid`, `Badge ${t} inversé`);
  G('Feedback', `--amf-feedback-${t}-solid`, '--amf-background-surface', `Point de Status ${t}`);
}
for (const a of ['orange', 'blue', 'green', 'navy', 'purple', 'grey']) {
  T('Tags', `--amf-accent-${a}-on-subtle`, `--amf-accent-${a}-subtle`, `Tag ${a}`);
  T('Tags', `--amf-accent-${a}-on-strong`, `--amf-accent-${a}-strong`, `Tag ${a} inversé`);
}
T('Tags', '--amf-action-primary-foreground', '--amf-action-primary-subtle', 'Tag Brand');
T(
  'Tags',
  '--amf-foreground-on-primary',
  '--amf-accent-grey-strong',
  'Count Grey (texte On Primary non utilisé : On Strong)',
  '--amf-background-surface',
);
P.pop();
T('Tags', '--amf-accent-grey-on-strong', '--amf-accent-grey-strong', 'Count Grey');
for (const bg of ['page', 'surface', 'surface-subtle'])
  G(
    'Bordures et focus',
    '--amf-border-input',
    `--amf-background-${bg}`,
    `Bordure de champ, case, interrupteur sur ${bg}`,
  );
for (const bg of ['page', 'surface'])
  G(
    'Bordures et focus',
    '--amf-border-focus',
    `--amf-background-${bg}`,
    `Anneau de focus sur ${bg}`,
  );
G('Bordures et focus', '--amf-border-error', '--amf-background-surface', 'Bordure d’erreur');
// Famille formulaire (lot 2) : options et items survolés, chips, zone de dépôt
T(
  'Formulaires',
  '--amf-foreground-primary',
  '--amf-action-neutral-subtle',
  'Option, item de menu, chip au survol',
);
T(
  'Formulaires',
  '--amf-foreground-primary',
  '--amf-action-neutral-subtle-hover',
  'Chip Filled au survol',
);
T(
  'Formulaires',
  '--amf-foreground-primary',
  '--amf-action-secondary-tint',
  'Zone de dépôt survolée : titre',
);
T(
  'Formulaires',
  '--amf-foreground-secondary',
  '--amf-action-secondary-tint',
  'Zone de dépôt survolée : aide',
);
G(
  'Formulaires',
  '--amf-action-secondary-default',
  '--amf-action-secondary-tint',
  'Zone de dépôt survolée : bordure',
);
G('Formulaires', '--amf-border-input', '--amf-action-neutral-subtle', 'Bordure de chip au survol');
T(
  'Formulaires',
  '--amf-action-error-foreground',
  '--amf-background-surface',
  'Item de menu destructif',
);

// Navigation et contenus (lot 3) : Table, Pagination, Breadcrumb, Stepper, List, Side Menu
const N = 'Navigation et contenus';
T(
  N,
  '--amf-foreground-secondary',
  '--amf-background-surface-subtle',
  'En-tête de colonne, ligne fille (Nested)',
);
T(N, '--amf-foreground-primary', '--amf-action-secondary-tint', 'Ligne de tableau sélectionnée');
T(
  N,
  '--amf-foreground-on-primary',
  '--amf-action-primary-default',
  'Page courante, item de menu latéral actif',
);
T(N, '--amf-foreground-on-primary', '--amf-action-secondary-default', 'Page courante (Secondary)');
T(N, '--amf-foreground-link', '--amf-background-surface', 'Lien du fil d’Ariane, lien retour');
T(N, '--amf-foreground-inverse', '--amf-action-primary-default', 'Numéro d’étape active');
T(N, '--amf-foreground-inverse', '--amf-feedback-neutral-solid', 'Numéro d’étape à venir');
T(N, '--amf-feedback-error-foreground', '--amf-background-surface', 'Libellé d’étape en erreur');
T(N, '--amf-action-secondary-on-tint', '--amf-action-secondary-tint', 'Élément de liste courant');
G(N, '--amf-feedback-error-on-solid', '--amf-feedback-error-solid', 'Icône d’étape en erreur');

// Messages et overlays (lot 4) : Alert, Message Info, Disclaimer, Tooltip, Modale
const M = 'Messages et overlays';
for (const t of ['info', 'success', 'warning', 'error', 'neutral']) {
  T(M, `--amf-feedback-${t}-on-solid`, `--amf-feedback-${t}-solid`, `Message Info Filled ${t}`);
  T(
    M,
    `--amf-feedback-${t}-foreground`,
    '--amf-background-surface',
    `Titre et icône Outlined, icône d’Alert ${t}`,
  );
  T(
    M,
    `--amf-feedback-${t}-foreground`,
    `--amf-feedback-${t}-background`,
    `Titre Soft, Disclaimer ${t}`,
  );
  T(
    M,
    '--amf-foreground-primary',
    `--amf-feedback-${t}-background`,
    `Texte du Message Info Soft ${t}`,
  );
  G(M, `--gui-feedback-${t}-inverse`, '--amf-background-inverse', `Icône d’Alert Dark ${t}`);
}
T(M, '--amf-foreground-inverse', '--amf-background-inverse', 'Alert Dark, Tooltip Plain');

// Structure et affichage (lot 5) : Rating, Scrollbar, Footer, Selectable Card, Divider Title, Avatar
const S = 'Structure et affichage';
G(S, '--gui-rating-filled', '--amf-background-surface', 'Étoile pleine du Rating');
G(
  S,
  '--amf-foreground-secondary',
  '--amf-background-surface-subtle',
  'Curseur de la Scrollbar sur sa piste',
);
T(S, '--amf-foreground-link', '--amf-background-surface-subtle', 'Lien du Footer');
T(S, '--amf-foreground-primary', '--amf-action-neutral-subtle', 'Selectable Card survolée');
T(S, '--amf-foreground-brand', '--amf-background-surface', 'Divider Title');
T(S, '--amf-accent-purple-on-strong', '--amf-accent-purple-strong', 'Avatar Purple');

function mesurer(vars) {
  return P.map((p) => {
    const sous = rgba(resoudre(vars, p.sous));
    const fond = composer(rgba(resoudre(vars, p.bg)), sous);
    const av = composer(rgba(resoudre(vars, p.fg)), fond);
    const r = ratio(av, fond);
    const seuil = p.type === 'texte' ? 4.5 : 3;
    return {
      ...p,
      avant: hex(av),
      arriere: hex(fond),
      ratio: Math.round(r * 100) / 100,
      seuil,
      ok: r >= seuil,
      apca: apca(av, fond),
    };
  });
}
/* Cohérence du mode sombre : un fond atténué (Subtle, Tint, Background de Feedback, fonds de page) doit rester sombre.
 * Un fond clair garde un bon contraste avec son texte foncé, donc le calcul WCAG ne le voit pas : on le contrôle à part
 * (luminance relative composée sur Surface ≤ 0,1). */
function fondsClairs(vars) {
  const surface = rgba(resoudre(vars, '--amf-background-surface'));
  return Object.keys(vars)
    .filter(
      (k) =>
        !/-on-/.test(k) &&
        /^--amf-(background-(page|surface|surface-subtle|disabled)|.*-(subtle|subtle-hover|tint)|feedback-\w+-background|action-disabled-background)$/.test(
          k,
        ),
    )
    .map((k) => ({
      jeton: k,
      couleur: hex(composer(rgba(resoudre(vars, k)), surface)),
      luminance: Math.round(lum(composer(rgba(resoudre(vars, k)), surface)) * 1000) / 1000,
    }))
    .filter((x) => x.luminance > 0.1);
}
const resultat = {
  genere: new Date().toISOString(),
  clair: mesurer(clair),
  sombre: mesurer(sombre),
  fondsClairsSombre: fondsClairs(sombre),
};
const echecs = (l) => l.filter((x) => !x.ok);
const dest = join(racine, 'projects/showcase/src/app/audit');
mkdirSync(dest, { recursive: true });
writeFileSync(
  join(dest, 'contrastes.generated.ts'),
  `// GÉNÉRÉ par scripts/audit-contrastes.mjs : ne pas modifier à la main.\nexport interface MesureContraste { groupe: string; type: 'texte' | 'graphique'; fg: string; bg: string; sous: string; usage: string; avant: string; arriere: string; ratio: number; seuil: number; ok: boolean; apca: number; }\nexport const CONTRASTES: { genere: string; clair: MesureContraste[]; sombre: MesureContraste[]; fondsClairsSombre: { jeton: string; couleur: string; luminance: number }[] } = ${JSON.stringify(resultat, null, 1)};\n`,
);
for (const mode of ['clair', 'sombre']) {
  const e = echecs(resultat[mode]);
  console.log(
    `${mode} : ${resultat[mode].length - e.length}/${resultat[mode].length} paires conformes`,
  );
  for (const x of e)
    console.log(`  ÉCHEC ${x.usage} : ${x.fg} sur ${x.bg} = ${x.ratio}:1 (seuil ${x.seuil}:1)`);
}
console.log(`sombre : ${resultat.fondsClairsSombre.length} fond(s) atténué(s) trop clair(s)`);
for (const x of resultat.fondsClairsSombre)
  console.log(`  ÉCHEC ${x.jeton} = ${x.couleur} (luminance ${x.luminance} > 0,1)`);
if (
  !process.argv.includes('--sans-echec') &&
  (echecs(resultat.clair).length ||
    echecs(resultat.sombre).length ||
    resultat.fondsClairsSombre.length)
)
  process.exit(1);
