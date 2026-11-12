# Mode sombre galma-ui : proposition et audit (2026-11-12)

AMF v2.0 n'a pas de mode sombre. Son journal le prévoit en modes de variables sur AMF Semantic (« Original Dark »,
12/09/2026), avec des calques d'état en Alpha/White, sans l'avoir dessiné. galma-ui en propose un : surcharge des seuls
jetons sémantiques AMF sous `:root.dark` (`projects/galma-ui/tokens/galma-theme.css`), aucune variante de composant.
**Proposition à soumettre au comité de relecture AMF.**

## Principes

- Fonds neutres #151515 (page), #1F1F1F (surface), #262626 (surface atténuée).
- Actions éclaircies sur les mêmes palettes AMF : Orange/300, Blue/300, Ruby/400, texte #151515 dessus.
- Fonds atténués (Subtle, Tint, Feedback Background, Accent Subtle) translucides ; textes au niveau 100-200 des palettes.
- Calques d'état Alpha/White ; focus neutre clair #F2F2F2.

## Outils

| Outil | Licence | Ce qu'il mesure | Résultat du 2026-11-12 |
|---|---|---|---|
| `scripts/audit-contrastes.mjs` (dépôt, sans dépendance) | interne | 75 paires d'usage des jetons, ratio WCAG 2.1 (texte 4,5:1, graphique 3:1, seuils AMF), APCA indicatif ; fonds atténués trop clairs en sombre | clair 75/75, sombre 75/75, 0 fond trop clair |
| axe-core 4.14.0 + Playwright (`scripts/audit-axe.mjs`) | MPL 2.0 / Apache 2.0 | 19 pages de la vitrine × clair et sombre, règles wcag2a, wcag2aa, wcag21a, wcag21aa | 38 pages, 0 violation |

Corrections faites pendant l'audit : Tags trop clairs en sombre (accents non surchargés, contraste bon donc invisible
au calcul WCAG : contrôle « fond atténué trop clair » ajouté) ; pastilles Count sans nom accessible (`role="img"` et texte
masqué) ; Badge et Tag désactivés marqués `aria-disabled` (états inactifs exemptés, comme dans l'audit CORE AMF du 15/09).

Reste « à vérifier » dans axe : les libellés des Toggle Buttons, dont axe ne lit pas le fond (couche de focus Material
par-dessus). Leurs couleurs sont dans l'audit des jetons.

## Limites

- Les outils automatiques ne trouvent qu'une partie des défauts : clavier, sens des libellés et ordre de lecture restent
  à vérifier à la main (sections Accessibilité des pages du Figma).
- Le ratio WCAG 2 est moins fiable sur fond sombre ; APCA est donné à titre indicatif (le RGAA s'appuie sur WCAG).
- Les états process Galma2 (marche, arrêt, alarme…) et les couleurs du synoptique ne sont pas encore audités : ils
  viendront avec la reprise des composants process.
