#!/usr/bin/env node
/*
 * Catalogue des exemples de la vitrine, GÉNÉRÉ : lit projects/showcase/src/app/exemples/<page>/<id>.{ts,html,css}
 * et écrit catalogue.generated.ts (composant + sources affichées et copiables). Titre et description : premier
 * commentaire JSDoc de la classe (première ligne = titre). Ordre : ordre.txt du dossier de la page. Lancé par `npm run exemples` (et avant build/start).
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const dossier = join(racine, 'projects/showcase/src/app/exemples');
const lire = (f) => (existsSync(f) ? readFileSync(f, 'utf8') : '');
const imports = [];
const entrees = [];
for (const page of readdirSync(dossier, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()) {
  // Ordre d'affichage : ordre.txt du dossier s'il existe (un identifiant par ligne), sinon alphabétique.
  const ordre = lire(join(dossier, page, 'ordre.txt'))
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const rang = (f) => {
    const i = ordre.indexOf(f.slice(0, -3));
    return i < 0 ? 1e6 : i;
  };
  const fichiers = readdirSync(join(dossier, page)).filter(
    (f) => f.endsWith('.ts') && !f.endsWith('.spec.ts'),
  );
  for (const f of fichiers.sort((a, b) => rang(a) - rang(b) || a.localeCompare(b))) {
    const id = f.slice(0, -3);
    const ts = lire(join(dossier, page, f));
    const classe = /export class (\w+)/.exec(ts)?.[1];
    if (!classe) throw new Error(`${page}/${f} : pas de classe exportée`);
    const doc =
      /\/\*\*([\s\S]*?)\*\//
        .exec(ts)?.[1]
        .split('\n')
        .map((l) => l.replace(/^\s*\*\s?/, '').trim())
        .filter(Boolean) ?? [];
    imports.push(`import { ${classe} } from './${page}/${id}';`);
    entrees.push(
      `  {\n    page: ${JSON.stringify(page)},\n    id: ${JSON.stringify(id)},\n    titre: ${JSON.stringify(doc[0] ?? id)},\n` +
        `    description: ${JSON.stringify(doc.slice(1).join(' '))},\n    composant: ${classe},\n` +
        `    ts: ${JSON.stringify(ts)},\n    html: ${JSON.stringify(lire(join(dossier, page, id + '.html')))},\n` +
        `    css: ${JSON.stringify(lire(join(dossier, page, id + '.css')))},\n  },`,
    );
  }
}
const sortie = `// GÉNÉRÉ par scripts/exemples.mjs : ne pas modifier à la main.
import { Type } from '@angular/core';
${imports.join('\n')}

export interface Exemple {
  page: string;
  id: string;
  titre: string;
  description: string;
  composant: Type<unknown>;
  ts: string;
  html: string;
  css: string;
}

export const EXEMPLES: Exemple[] = [
${entrees.join('\n')}
];
`;
writeFileSync(join(dossier, 'catalogue.generated.ts'), sortie);
console.log(`exemples : ${entrees.length} exemples écrits dans catalogue.generated.ts`);
