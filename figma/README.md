# Figma AMF

- `sources/` : exports .fig du Figma « AMF Design System » (Fichier › Enregistrer une copie locale). Y déposer chaque
  nouvelle version sans écraser les précédentes ; la v2.0 sert aussi aux tests de l'outil (`npm run test:figma`).
- `instantane.json` : description de la version de référence (jetons, pages, composants calque par calque, journal),
  écrite par `scripts/amf-figma.mjs`. Ne pas la modifier à la main.
- `rapports/` : rapports d'évolution produits par `npm run figma:comparer` (créé au premier rapport).
- `extraits-v2.0/` : extraits texte de la v2.0 faits avec `outils/analyse-figma/` : journal de la page Changelog
  (`changelog.txt`, source de `docs/conformite-journal-figma.md`), liste des composants, variables, jetons au format
  DTCG.

Mode d'emploi pour une nouvelle version : [docs/suivi-figma.md](../docs/suivi-figma.md).
