# Conformité d'n3ga2-ds-audit 0.9.0 au journal du Figma AMF v2.0 (2026-11-12)

Source : page Changelog du .fig (entrées du 12/09 au 26/10/2026), extraite dans
`figma/extraits-v2.0/changelog.txt`. Détail ligne à ligne : page « Conformité au journal » de la vitrine
(`projects/showcase/src/app/pages/conformite-donnees.ts`).

124 décisions retenues (fondations, lot 1, lot 2 famille formulaire, lot 3 navigation et contenus, lot 4 messages et
overlays, lot 5 structure et affichage, lot 6 composants métier) : **98 conformes**, **21 adaptées** (même rendu, obtenu
autrement à cause de Material), **2 écarts**, **3 hors lot**. Toutes les pages 🆕 du Figma ont désormais leur
composant.

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
- Table, pastille décorative de l'en-tête (hasIcon) : dégradé hors jetons recopié du Figma (#5B2A86 → #D63A3A →
  #F3923C), version simplifiée du style « Gradient » de l'ancien thème AMF (logotype, gabarits) ; repris à la demande de
  Gunther malgré ses réserves esthétiques, à signaler au comité AMF.
- Alert Dark : icônes en Feedback/<Type>/Inverse, variables supprimées du .fig mais toujours référencées ; teintes 300 de ces
  variables reprises et, en mode sombre, pleins du mode clair.
- Message Info et Disclaimer : largeurs laissées en dur dans le Figma (480 et 800), largeur du conteneur dans n3ga2-ds-audit.
- Tooltip : flèche ajoutée par le CSS (Material n'en a pas) ; Rich en toggletip ouvert au clic (overlay CDK).
- Rating : Material n'a pas de note, CSS pur et boutons radio natifs masqués ; étoile pleine en Gold/600, primitive sans
  jeton sémantique (variable `--gui-rating-filled`), Gold/300 en mode sombre (proposition n3ga2-ds-audit).
- Selectable Card : CSS pur autour d'un `mat-radio-button` ou d'un `mat-checkbox`, clic sur la carte relayé par
  l'application.
- Section : pastille d'en-tête au même dégradé hors jetons que celle de Table.
- Reorderable List : glisser-déposer du CDK (transitions coupées avec `animations: false`), déplacement au clavier par
  la poignée.
- Agenda : tableau HTML habillé (Material n'a pas d'agenda) ; jours hors du mois en boutons inactifs ; règle
  « n de plus » de l'exemple (au-delà de trois événements, deux visibles) à confirmer.
- Chat Bubble : colonne limitée à 80 % du fil, le Figma n'en fixe pas.

Écarts :

- Grille (guideline Grid & Layout, page v1 non refondue) : les cadres annotés décrivent 12 colonnes (marge et gouttière
  mobile 16 / 16, tablette 96 / 24, desktop 24 / 16), le texte 8 colonnes avec une gouttière de 24 et des bords de 12 ;
  `gui-grid` suit les cadres, seuils 744 et 1440 px pris sur leurs largeurs. À faire trancher par le comité AMF.
- Calendar : largeur 312 px appliquée, mais Material garde 4 colonnes (mois 4 × 3, années 4 × 6) là où le Figma passe
  à 3 colonnes (3 × 4, 3 × 8, journal du 22/09).

Hors lot : apparence Fill du Form Field ; icône et Count dans les onglets, onglets verticaux ; vues Semaine et Jour de
l'Agenda (non dessinées dans le Figma).

Corrigé grâce au contrôle : l'astérisque des champs obligatoires, retiré par AMF le 24/09 (audit RGAA Sopra), avait été
mis dans le premier jet ; un test de la vitrine empêche son retour.
