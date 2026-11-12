# Mode sombre galma-ui : proposition et audit (2026-11-12, mis à jour avec le lot 2)

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
| `scripts/audit-contrastes.mjs` (dépôt, sans dépendance) | interne | 82 paires d'usage des jetons (dont 7 de la famille formulaire), ratio WCAG 2.1 (texte 4,5:1, graphique 3:1, seuils AMF), APCA indicatif ; fonds atténués trop clairs en sombre | clair 82/82, sombre 82/82, 0 fond trop clair |
| axe-core 4.14.0 + Playwright (`scripts/audit-axe.mjs`) | MPL 2.0 / Apache 2.0 | 27 pages de la vitrine et 5 panneaux ouverts (Select, calendrier, liste d'heures, deux menus) × clair et sombre, règles wcag2a, wcag2aa, wcag21a, wcag21aa | 64 analyses, 0 violation, 1 exception documentée |

Corrections faites pendant l'audit : Tags trop clairs en sombre (accents non surchargés, contraste bon donc invisible
au calcul WCAG : contrôle « fond atténué trop clair » ajouté) ; pastilles Count sans nom accessible (`role="img"` et texte
masqué) ; Badge et Tag désactivés marqués `aria-disabled` (états inactifs exemptés, comme dans l'audit CORE AMF du 15/09).

Lot 2 (famille formulaire) : aide de la zone de dépôt survolée à 4,49:1 en sombre, Secondary Tint sombre ramené de 20 à
16 % d'opacité ; grille de chips avec le champ de saisie dedans (`aria-required-children`), champ sorti de la grille comme
le prévoit Material ; zone de dépôt désactivée marquée `aria-disabled` ; libellés du Date Picker passés en français
(`GalmaDatepickerIntl`).

Exception documentée (`label-content-name-mismatch`, critère 2.5.3) : le bouton de période du calendrier Material cache
le texte affiché (« NOV. 2026 ») aux aides techniques et se nomme « Choisir le mois et l'année », la période étant donnée
en description. Écart Material connu ; correction possible par un en-tête de calendrier personnalisé
(`calendarHeaderComponent`). L'exception vise ce seul bouton et cette seule règle (`scripts/audit-axe.mjs`).

Reste « à vérifier » dans axe : les libellés des Toggle Buttons, dont axe ne lit pas le fond (couche de focus Material
par-dessus). Leurs couleurs sont dans l'audit des jetons.

## Limites

- Les outils automatiques ne trouvent qu'une partie des défauts : clavier, sens des libellés et ordre de lecture restent
  à vérifier à la main (sections Accessibilité des pages du Figma).
- Le ratio WCAG 2 est moins fiable sur fond sombre ; APCA est donné à titre indicatif (le RGAA s'appuie sur WCAG).
- Les états process Galma2 (marche, arrêt, alarme…) et les couleurs du synoptique ne sont pas encore audités : ils
  viendront avec la reprise des composants process.
