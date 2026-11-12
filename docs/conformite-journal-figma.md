# Conformité de galma-ui 0.3.0 au journal du Figma AMF v2.0 (2026-11-12)

Source : page Changelog du .fig (entrées du 12/09 au 26/10/2026), extraite dans
`04-analyse/figma-amf/changelog.txt`. Détail ligne à ligne : page « Conformité au journal » de la vitrine
(`projects/showcase/src/app/pages/conformite-donnees.ts`).

84 décisions retenues (fondations, lot 1, lot 2 famille formulaire, lot 3 navigation et contenus) : **69 conformes**,
**10 adaptées** (même rendu, obtenu autrement à cause de Material), **2 écarts**, **3 hors lot**.

Adaptées :

- Mode sombre : le .fig n'a pas les modes « Dark » annoncés ; surcharge des jetons sémantiques, à faire valider.
- Focus des boutons : indicateur de focus Material, même géométrie que le cadre « Focus Ring » du Figma.
- Survol et appui des boutons : calques d'état Material à 0, couleur du conteneur changée comme dans le Figma.
- Libellé du Form Field au-dessus du champ : `<label for>` + `mat-form-field` sans `mat-label`.
- Date Picker : raccourcis (Chips Assist) à composer par l'application, Material n'en propose pas.
- Slider : étiquette de valeur en mode `discrete` seulement (au glissement et au focus).
- Accordion : Material fait tourner un seul chevron au lieu de permuter expand_more / expand_less.
- Stepper : coche des étapes terminées par `matStepperIcon` (Material affiche un crayon) ; pas d'étape désactivée
  dans Material.
- Table, tri : `unfold_more` ajouté par le CSS sur les colonnes triables non triées (Material n'affiche sa flèche qu'au
  survol).
- Table, types Expand et Nested : lignes filles calculées par le composant (Material n'a pas de lignes filles).

Écarts :

- Card, état Hover non décrit dans le journal, non implémenté.
- Calendar : largeur 312 px appliquée, mais Material garde 4 colonnes (mois 4 × 3, années 4 × 6) là où le Figma passe
  à 3 colonnes (3 × 4, 3 × 8, journal du 22/09).

Hors lot : apparence Fill du Form Field ; icône et Count dans les onglets, onglets verticaux ; pastille décorative en
quart de cercle de l'en-tête de Table (dégradé hors jetons, à faire valider).

Corrigé grâce au contrôle : l'astérisque des champs obligatoires, retiré par AMF le 24/09 (audit RGAA Sopra), avait été
mis dans le premier jet ; un test de la vitrine empêche son retour.
