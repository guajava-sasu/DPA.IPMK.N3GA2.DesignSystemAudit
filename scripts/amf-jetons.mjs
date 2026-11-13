#!/usr/bin/env node
// Génère projects/amf-design-system/tokens/amf-tokens.css depuis le Figma du design system AMF.
//
//   node scripts/amf-jetons.mjs [chemin/vers/AMF Design System.fig] [--dtcg sortie.json]
//
// Sans argument, lit le .fig de la version de référence (nom noté dans figma/instantane.json, à défaut « AMF Design
// System [v2.0].fig »), cherché dans figma/sources/ puis dans le dossier parent du dépôt. Pour une nouvelle version du Figma, passer par
// « node scripts/amf-figma.mjs appliquer <fichier.fig> » (rapport des évolutions et contrôle des jetons encore
// utilisés avant d'écrire).
// Aucune dépendance : Node ≥ 22.15 (zstd natif). Lecture du .fig : scripts/figma/lire-fig.mjs ; extraction des
// jetons : scripts/figma/jetons.mjs. Pour comparer deux versions du Figma avant de régénérer : scripts/amf-figma.mjs.
//
// Ce qui est généré (préfixe --amf-) :
//   - les primitives de couleur (collection « AMF Primitives ») ;
//   - les jetons sémantiques (« AMF Semantic »), écrits en var() vers les primitives, comme dans Figma ;
//   - les dimensions (« AMF Dimensions ») en px, mode Default sur :root, mode Rounded sous .amf-rounded ;
//   - les styles de texte (taille, interligne, graisse, approche) et les ombres « Dropshadow ».
// Fichier généré : ne pas le modifier à la main, relancer ce script.

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lireFig } from './figma/lire-fig.mjs';
import { extraireJetons } from './figma/jetons.mjs';
import { figDeReference } from './figma/instantane.mjs';

const racine = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const iDtcg = args.indexOf('--dtcg');
const sortieDtcg = iDtcg >= 0 ? args.splice(iDtcg, 2)[1] : null;
const sortieCss = resolve(racine, 'projects/amf-design-system/tokens/amf-tokens.css');

try {
  const source = resolve(args[0] ?? figDeReference(racine));
  const { meta, message } = lireFig(source);
  const { css, dtcg, jetons, modesIgnores } = extraireJetons(message, meta, source);
  writeFileSync(sortieCss, css);
  if (sortieDtcg) writeFileSync(resolve(sortieDtcg), `${JSON.stringify(dtcg, null, 2)}\n`);
  console.log(`${sortieCss} : ${jetons.size} jetons`);
  if (modesIgnores.length)
    console.warn(
      `Mode(s) non générés dans le CSS : ${modesIgnores.join(', ')} (à reporter à la main)`,
    );
} catch (e) {
  console.error(`amf-jetons : ${e.message}`);
  process.exit(1);
}
