#!/usr/bin/env node
/*
 * Audit axe-core (Deque, MPL 2.0) de la vitrine, en clair et en sombre, règles WCAG 2.0 / 2.1 niveaux A et AA.
 * Prérequis : vitrine construite (npm run build) et servie, par défaut sur http://localhost:4321/ :
 *   npx http-server dist/showcase/browser -p 4321   (ou tout serveur de fichiers statiques)
 *   node scripts/audit-axe.mjs [url]
 * Écrit projects/showcase/public/audit/axe.json (affiché par la page Mode sombre) et sa copie dans dist/.
 * Code de sortie 1 s'il reste une violation.
 */
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.argv[2] ?? 'http://localhost:4321/').replace(/\/?$/, '/');
const REGLES = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

// Routes : pages fixes + une page par composant (lues dans pages.ts).
const pagesTs = readFileSync(join(racine, 'projects/showcase/src/app/pages/pages.ts'), 'utf8');
const composants = [...pagesTs.matchAll(/id: '([\w-]+)',\s*\n\s*titre: '([^']+)'/g)].map((m) => ({
  route: `/composants/${m[1]}`,
  titre: m[2],
}));
const routes = [
  { route: '/', titre: 'Installation' },
  { route: '/couleurs', titre: 'Couleurs' },
  { route: '/typographie', titre: 'Typographie et dimensions' },
  ...composants,
  { route: '/mode-sombre', titre: 'Mode sombre audité' },
  { route: '/conformite', titre: 'Conformité au journal' },
];

// Exceptions documentées : nœud et règle précis, motif affiché sur la page Mode sombre. Les autres règles
// continuent de s'appliquer à ces éléments.
const EXCEPTIONS = [
  {
    regle: 'label-content-name-mismatch',
    cible: '.mat-calendar-period-button',
    motif:
      'Bouton de période du calendrier Material : texte affiché (« NOV. 2026 ») caché aux aides techniques, nom « Choisir le mois et l’année », période donnée en description (aria-describedby). Écart Material connu sur le critère 2.5.3 ; correction possible par un en-tête de calendrier personnalisé (calendarHeaderComponent).',
  },
];
const appliquerExceptions = (violations) => {
  const retenues = [];
  const exceptees = [];
  for (const v of violations) {
    const noeuds = v.nodes.filter((n) => {
      const e = EXCEPTIONS.find((x) => x.regle === v.id && n.target.join(' ').includes(x.cible));
      if (e) exceptees.push({ id: v.id, cible: e.cible, motif: e.motif });
      return !e;
    });
    if (noeuds.length) retenues.push({ ...v, nodes: noeuds });
  }
  return { retenues, exceptees };
};
const resume = (res) => {
  const { retenues, exceptees } = appliquerExceptions(res.violations);
  return {
    violations: retenues.map((v) => ({
      id: v.id,
      impact: v.impact ?? '',
      aide: v.help,
      noeuds: v.nodes.length,
      cibles: v.nodes.slice(0, 5).map((n) => n.target.join(' ')),
    })),
    exceptions: exceptees,
    reussies: res.passes.length,
    incompletes: res.incomplete.length,
  };
};

// Panneaux flottants (overlay CDK) : audités ouverts, en plus de la page fermée.
const PANNEAUX = [
  { route: '/composants/select', titre: 'Select ouvert', ouvrir: 'mat-select' },
  { route: '/composants/date', titre: 'Calendrier ouvert', ouvrir: 'mat-datepicker-toggle button' },
  {
    route: '/composants/heure',
    titre: 'Liste d’heures ouverte',
    ouvrir: 'mat-timepicker-toggle button',
  },
  { route: '/composants/menu', titre: 'Menu ouvert', ouvrir: '[aria-haspopup="menu"]' },
  {
    route: '/composants/bouton-menu',
    titre: 'Button Dropdown ouvert',
    ouvrir: '[aria-haspopup="menu"]',
  },
  {
    route: '/composants/tableau',
    titre: 'Paginateur : liste ouverte',
    ouvrir: '.mat-mdc-paginator mat-select',
  },
  {
    route: '/composants/fil-ariane',
    titre: 'Fil d’Ariane : niveaux repliés ouverts',
    ouvrir: '.gui-breadcrumb-ellipsis',
  },
  {
    route: '/composants/menu-lateral',
    titre: 'Menu latéral replié',
    ouvrir: '.gui-side-menu-top button',
  },
  {
    route: '/composants/tableau',
    titre: 'Tableau : ligne repliée',
    ouvrir: 'ex-tableau-depliable button[aria-expanded="true"]',
  },
];

const version = JSON.parse(
  readFileSync(join(racine, 'node_modules/axe-core/package.json'), 'utf8'),
).version;
const navigateur = await chromium.launch();
const contexte = await navigateur.newContext({ viewport: { width: 1400, height: 1000 } });
const page = await contexte.newPage();
const resultats = [];
for (const mode of ['clair', 'sombre']) {
  for (const r of routes) {
    await page.goto(`${base}?mode=${mode === 'sombre' ? 'dark' : 'light'}#${r.route}`, {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(250);
    const res = await new AxeBuilder({ page }).withTags(REGLES).analyze();
    const r2 = { route: r.route, titre: r.titre, mode, ...resume(res) };
    resultats.push(r2);
    const n = r2.violations.length;
    console.log(
      `${mode.padEnd(6)} ${r.route.padEnd(28)} ${n ? `${n} violation(s) : ${r2.violations.map((v) => `${v.id} ×${v.noeuds}`).join(', ')}` : 'aucune violation'} (${res.incomplete.length} à vérifier)`,
    );
  }
  for (const r of PANNEAUX) {
    await page.goto(`${base}?mode=${mode === 'sombre' ? 'dark' : 'light'}#${r.route}`, {
      waitUntil: 'networkidle',
    });
    await page.locator(r.ouvrir).first().click();
    await page.waitForTimeout(400);
    const res = await new AxeBuilder({ page }).withTags(REGLES).analyze();
    const r2 = { route: r.route + ' (panneau)', titre: r.titre, mode, ...resume(res) };
    resultats.push(r2);
    const n = r2.violations.length;
    console.log(
      `${mode.padEnd(6)} ${(r.route + ' (panneau)').padEnd(28)} ${n ? `${n} violation(s) : ${r2.violations.map((v) => `${v.id} ×${v.noeuds}`).join(', ')}` : 'aucune violation'} (${res.incomplete.length} à vérifier)`,
    );
  }
}
await navigateur.close();

const sortie = {
  genere: new Date().toISOString(),
  outil: `axe-core ${version}`,
  regles: REGLES.join(', '),
  exceptions: EXCEPTIONS,
  pages: resultats,
};
const json = JSON.stringify(sortie, null, 1);
for (const d of [
  join(racine, 'projects/showcase/public/audit'),
  join(racine, 'dist/showcase/browser/audit'),
]) {
  if (d.includes('dist') && !existsSync(join(racine, 'dist/showcase/browser'))) continue;
  mkdirSync(d, { recursive: true });
  writeFileSync(join(d, 'axe.json'), json);
}
const total = resultats.reduce((s, r) => s + r.violations.length, 0);
console.log(`\n${resultats.length} pages auditées, ${total} violation(s).`);
process.exit(total ? 1 : 0);
