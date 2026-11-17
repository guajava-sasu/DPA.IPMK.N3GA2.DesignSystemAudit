> Exemple produit le 2026-11-13 par `npm run figma:comparer` sur une v2.1 **fictive** : copie de la v2.0 où Color/Blue/500
> a changé, Background/Surface Subtle a été renommé Surface Muted, les variantes Default de Task Card ont un rayon de
> 12 détaché de sa variable, la page « Task Card 🆕 » a perdu son 🆕 et une ligne du journal a été réécrite. Les
> numéros de ligne « encore utilisé » sont ceux du dépôt à cette date. Mode d’emploi : [suivi-figma.md](suivi-figma.md).

# Évolutions du Figma AMF

- Référence : AMF Design System [v2.0].fig (export du 2026-11-12T08:13:23.347Z)
- Nouvelle version : AMF Design System [v2.1].fig (export du 2026-12-01T10:00:00.000Z)

## Synthèse

| Domaine | Ajouts | Suppressions | Modifications |
| --- | --- | --- | --- |
| Jetons | 0 | 0 | 1 (+ 1 renommages probables) |
| Pages | 0 | 0 | 1 renommée(s) |
| Composants | 0 | 0 | 1 |
| Journal | 0 | 0 | 1 |

## À faire

1. Remplacer 1 jeton(s) supprimé(s) ou renommé(s) encore utilisé(s) dans le dépôt (détail plus bas) : tant qu'il en reste, `appliquer` n'écrit rien (sauf avec `--force`).
2. Régénérer `amf-tokens.css` et l'instantané : `node scripts/amf-figma.mjs appliquer "figma/sources/AMF Design System [v2.1].fig"` (relance l'audit des contrastes). Vérifier ensuite la page Mode sombre : les surcharges sombres de `amf-theme.css` ne viennent pas du Figma.
3. Reporter à la main les changements de composants dans les fichiers `tokens/amf-*.css` et les exemples de la vitrine, puis lancer les tests et `npm run audit:axe`.
4. Lire les entrées nouvelles ou réécrites du journal et compléter `conformite-donnees.ts` et `docs/conformite-journal-figma.md`.

## Jetons

Renommages probables (même valeur) :

- `--amf-background-surface-subtle` → `--amf-background-surface-muted` (var(--amf-color-steel-50)) — **encore utilisé** : projects/n3ga2-ds-audit/tokens/amf-material.css:265,375,376,377,378 ; projects/n3ga2-ds-audit/tokens/amf-messages.css:307 ; projects/n3ga2-ds-audit/tokens/amf-metier.css:384,412,618 ; projects/n3ga2-ds-audit/tokens/amf-navigation.css:99,128 ; projects/n3ga2-ds-audit/tokens/amf-structure.css:89,203,215,428 ; projects/n3ga2-ds-audit/tokens/amf-theme.css:93,235,238,244 ; projects/showcase/src/app/commun/bloc-code.ts:27 ; projects/showcase/src/app/exemples/etapes/etapes-horizontal.css:6 ; projects/showcase/src/app/exemples/etapes/etapes-vertical.css:6 ; projects/showcase/src/app/exemples/grille/grille-decoupes.css:14 ; projects/showcase/src/app/exemples/grille/grille-formats.css:29 ; projects/showcase/src/app/pages/conformite.ts:123 ; projects/showcase/src/app/pages/mode-sombre.ts:277 ; scripts/audit-contrastes.mjs:257,307,310,336 — **nom construit par morceaux** (à vérifier) : projects/showcase/src/app/pages/couleurs.ts:8 ; scripts/audit-contrastes.mjs:103,198

Valeurs modifiées :

- `--amf-color-blue-500` : #0072ce → #0066cc

## Pages

- Page renommée : Task Card 🆕 → Task Card

## Composants

139 attribut(s) de calque ne changent que par un jeton renommé : non listés ici.

### Task Card › Task Card — vitrine : `carte-tache`

- 6 variantes Color=Blue, State=Default ; Color=Purple, State=Default ; Color=Orange, State=Default ; Color=Green, State=Default ; Color=Navy, State=Default ; Color=Grey, State=Default :
  - (racine) : rayon 10 [Radius/L] **→** 12

## Journal (page Changelog)

- Réécrit : • Coquilles dans les noms de pages : Additionnal, Disclamer, Enanced Tab Menu.
  - ajouté : • Page Inputs dédoublonnée : une seule section (set 2562:1634).
  - retiré : • Page Inputs dupliquée (deux sections identiques, sets 2562:1634 et 2673:1168).

