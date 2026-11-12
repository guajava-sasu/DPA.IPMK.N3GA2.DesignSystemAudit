# Conformité de galma-ui 0.1.0 au journal du Figma AMF v2.0 (2026-11-12)

Source : page Changelog du .fig (entrées du 12/09 au 26/10/2026), extraite dans
`04-analyse/figma-amf/changelog.txt`. Détail ligne à ligne : page « Conformité au journal » de la vitrine
(`projects/showcase/src/app/pages/conformite-donnees.ts`).

42 décisions retenues (fondations et composants du lot 1) : **35 conformes**, **4 adaptées** (même rendu, obtenu
autrement à cause de Material), **1 écart**, **2 hors lot**.

Adaptées :
- Mode sombre : le .fig n'a pas les modes « Dark » annoncés ; surcharge des jetons sémantiques, à faire valider.
- Focus des boutons : indicateur de focus Material, même géométrie que le cadre « Focus Ring » du Figma.
- Survol et appui des boutons : calques d'état Material à 0, couleur du conteneur changée comme dans le Figma.
- Libellé du Form Field au-dessus du champ : `<label for>` + `mat-form-field` sans `mat-label`.

Écart : Card, état Hover non décrit dans le journal, non implémenté.

Hors lot : apparence Fill du Form Field ; icône et Count dans les onglets, onglets verticaux.

Corrigé grâce au contrôle : l'astérisque des champs obligatoires, retiré par AMF le 24/09 (audit RGAA Sopra), avait été
mis dans le premier jet ; un test de la vitrine empêche son retour.
