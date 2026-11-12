/*
 * Contrôle d'amf-design-system 0.9.0 par rapport au journal (Changelog) du Figma AMF v2.0, entrées du 12/09 au 26/10/2026.
 * Une ligne par décision du journal qui touche les fondations ou un composant des lots 1 à 6 (famille formulaire, navigation et contenus, messages et overlays, structure et affichage, composants métier). Statuts :
 *   conforme  : implémenté comme le journal le décrit (valeur venue des jetons générés quand c'est une couleur ou une mesure)
 *   adapte    : même résultat visuel, obtenu autrement à cause de Material (expliqué)
 *   ecart     : différence connue, à corriger ou à faire valider
 *   hors-lot  : composant ou variante pas encore construit
 */
export type StatutConformite = 'conforme' | 'adapte' | 'ecart' | 'hors-lot';
export interface LigneConformite {
  date: string;
  entree: string;
  decision: string;
  statut: StatutConformite;
  realisation: string;
}

export const CONFORMITE: LigneConformite[] = [
  // Fondations
  {
    date: '12/09',
    entree: 'Tokens (fondations)',
    decision: 'Primitives, Semantic (alias des primitives) et Dimensions.',
    statut: 'conforme',
    realisation: 'amf-tokens.css généré depuis le .fig (380 jetons), alias conservés en var().',
  },
  {
    date: '12/09',
    entree: 'Tokens (fondations)',
    decision:
      'Mode sombre prévu en modes de variables sur AMF Semantic, sans variante de composant.',
    statut: 'adapte',
    realisation:
      'Le .fig n’a pas ces modes : amf-design-system surcharge les jetons sémantiques sous :root.dark, les composants ne changent pas. Proposition à faire valider (page Mode sombre).',
  },
  {
    date: '12/09',
    entree: 'Checkbox, Radio, Switch',
    decision:
      'State Layer Hover / Pressed en Alpha/Black 8 et 12, à réaliaser vers Alpha/White en sombre.',
    statut: 'conforme',
    realisation:
      'Calques noirs 8 / 12 % en clair, blancs en sombre (amf-material.css, :root.dark).',
  },
  {
    date: '15/09',
    entree: 'Rationalisation 160 → 128',
    decision: 'Foreground remplace Text et Icon ; Accent remplace Tag ; Tags Regular sans contour.',
    statut: 'conforme',
    realisation:
      'Seuls les jetons --amf-foreground-* et --amf-accent-* sont utilisés ; gui-tag sans bordure.',
  },
  {
    date: '15/09',
    entree: 'Audit CORE, option A ; cuivre P2 ; cuivre assombri',
    decision:
      'Action/Primary/Default = Orange/600 #B34C00 (5,3:1 sur blanc), Foreground/Brand identique.',
    statut: 'conforme',
    realisation:
      '--amf-action-primary-default et --amf-foreground-brand générés à #B34C00 ; mesuré 5,3:1 (page Mode sombre, mode clair).',
  },
  {
    date: '24/09',
    entree: 'Rationalisation dimensions 52 → 31',
    decision: 'Échelle Size/8 à 64 unique ; Border Width/Focus Ring fusionné dans Medium.',
    statut: 'conforme',
    realisation:
      'Jetons --amf-size-* et --amf-border-width-* générés ; les composants reprennent ces valeurs.',
  },
  {
    date: '24/09',
    entree: 'Audit Sopra (RGAA 4.1.2)',
    decision: 'Élévation par Border/Strong (Steel/600) sur Card, Table, List, Dialog, Menu…',
    statut: 'conforme',
    realisation:
      'Card, Table, List, Accordion, Stepper, Modale : bordure --amf-border-strong ; l’ombre de la Card Elevated s’y ajoute, comme dans le .fig.',
  },
  {
    date: '25/09',
    entree: 'Retours : Warning, sélection, liens',
    decision:
      'Warning passe en Amber ; Secondary/Tint en Blue/50 ; Foreground/Link en cuivre, lien souligné dans un paragraphe.',
    statut: 'conforme',
    realisation: 'Valeurs venues des jetons ; liens soulignés (style navigateur conservé).',
  },
  {
    date: '26/10',
    entree: 'Palettes renommées',
    decision: 'Crimson → Ruby, Amber → Gold, alias sémantiques inchangés.',
    statut: 'conforme',
    realisation: 'Primitives --amf-color-ruby-* et --amf-color-gold-* générées.',
  },
  {
    date: '26/10',
    entree: 'Guidelines v1 (Grid & Layout)',
    decision:
      'Pages de guidelines v1 gardées, valeurs figées en brut, à refaire sur la v2 ; Grid & Layout : cadres en 12 colonnes, texte en 8 colonnes.',
    statut: 'ecart',
    realisation:
      'Grille gui-grid en 12 colonnes des cadres (marge et gouttière : mobile 16 / 16, tablette 96 / 24, desktop 24 / 16), seuils 744 et 1440 px pris sur les cadres ; contradiction du Figma à faire trancher par le comité AMF.',
  },
  // Button
  {
    date: '12/09',
    entree: 'Button Icon et Button',
    decision:
      '32 / 40 / 48 px, rayon Radius/Button, BUTTON 2, icônes de tête et de fin, largeur mini 64.',
    statut: 'conforme',
    realisation: 'Jetons --mat-button-* ; classes gui-sm / gui-lg ; mat-icon et iconPositionEnd.',
  },
  {
    date: '12/09',
    entree: 'Button Icon et Button',
    decision: 'Mode Rounded (Radius/Button = Full) choisi par mode sur la frame, pas par variante.',
    statut: 'conforme',
    realisation:
      'Classe amf-rounded générée depuis le mode Rounded ; bascule dans l’en-tête de la vitrine.',
  },
  {
    date: '12/09',
    entree: 'Button Icon et Button',
    decision: 'Focus : anneau Border/Focus 2 px décalé de 4 px, rayon Radius/Button Focus.',
    statut: 'adapte',
    realisation:
      'Indicateur de focus Material : cadre à 4 px du bouton, trait 2 px à l’intérieur, comme le cadre « Focus Ring » du Figma (48 × 48 à -4 px). Rayon Radius/Button Focus.',
  },
  {
    date: '14/09',
    entree: 'Suppression du style Tonal',
    decision: 'Filled / Outlined / Text et Standard / Filled / Outlined seulement.',
    statut: 'conforme',
    realisation: 'Pas de matButton="tonal" dans les exemples ni dans le thème.',
  },
  {
    date: '14/09',
    entree: 'Retours de revue : focus neutre',
    decision: 'Border/Focus neutre (Steel/800), ≥ 9,6:1 sur Page et Surface.',
    statut: 'conforme',
    realisation:
      'Tous les anneaux utilisent --amf-border-focus ; mesuré dans l’audit des contrastes.',
  },
  {
    date: '16/09',
    entree: 'Error devient Destructive',
    decision: 'Couleur Destructive sur Button et Button Icon, jetons Action/Error.',
    statut: 'conforme',
    realisation: 'Classe gui-destructive reliée à --amf-action-error-*.',
  },
  {
    date: '24/09',
    entree: 'Audit Sopra, retours',
    decision: 'Bouton désactivé : gris Action/Disabled, attribut disabled côté code.',
    statut: 'conforme',
    realisation: 'Attribut disabled ; couleurs --amf-action-disabled-*.',
  },
  {
    date: '12/09',
    entree: 'Button Icon et Button',
    decision:
      'Survol et appui : couleur du conteneur Hover / Pressed (Filled), Subtle / Subtle Hover (Outlined, Text, Standard).',
    statut: 'adapte',
    realisation:
      'Calques d’état Material mis à 0 et couleur du conteneur changée en CSS, comme le Figma.',
  },
  // Form Field
  {
    date: '12/09',
    entree: 'Input Base et Form Field',
    decision: 'Libellé au-dessus du champ en Form Label, aide / erreur en Caption, compteur.',
    statut: 'adapte',
    realisation:
      'Material fait flotter le libellé : amf-design-system place un <label for> au-dessus (gui-field-label) et un mat-form-field sans mat-label ; compteur par mat-hint align="end".',
  },
  {
    date: '12/09',
    entree: 'Input Base et Form Field',
    decision: 'Appearance Outline / Fill ; Standard abandonné.',
    statut: 'hors-lot',
    realisation: 'Outline seule dans ce lot ; Fill à faire si un écran en a besoin.',
  },
  {
    date: '12/09',
    entree: 'Input Base et Form Field',
    decision: 'États Hover, Focused (2 px), Error (2 px), Disabled, Readonly.',
    statut: 'conforme',
    realisation:
      'Jetons --mat-form-field-outlined-* ; erreur à 2 px même sans focus ; lecture seule par la classe gui-readonly.',
  },
  {
    date: '14/09',
    entree: 'Form Field : slot Tag',
    decision: 'Tag « Facultatif » sur la ligne du libellé.',
    statut: 'conforme',
    realisation: 'Classe gui-field-label-row avec un gui-tag gui-sm.',
  },
  {
    date: '24/09',
    entree: 'Audit Sopra (RGAA 4.1.2)',
    decision:
      'Astérisque et isRequired supprimés ; le formulaire annonce « Sauf indication contraire, tous les champs sont obligatoires ».',
    statut: 'conforme',
    realisation:
      'Pas d’astérisque ; attribut required sur l’input ; la consigne figure dans l’exemple.',
  },
  {
    date: '16/09',
    entree: 'Lot 5, vague 2 : préfixe / suffixe et Textarea',
    decision: 'Préfixe et suffixe texte (unités, devise) ; Textarea.',
    statut: 'conforme',
    realisation: 'matTextPrefix / matTextSuffix en Foreground/Secondary. Textarea : hors lot.',
  },
  // Checkbox, Radio, Switch
  {
    date: '12/09',
    entree: 'Checkbox, Radio, Switch',
    decision:
      'Case 18 px Radius/XS bord 2 ; radio 20 / point 10 ; Primary / Secondary ; état Error ; Body 2.',
    statut: 'conforme',
    realisation:
      'Jetons --mat-checkbox-* / --mat-radio-* ; gui-secondary ; gui-error pour la case.',
  },
  {
    date: '14/09',
    entree: 'State layer réduit',
    decision: 'Calque d’état 32 px, zone de contrôle 40 px.',
    statut: 'conforme',
    realisation: 'state-layer-size 32 px et marge de 4 px : contrôle de 40 px.',
  },
  {
    date: '12/09',
    entree: 'Checkbox, Radio, Switch',
    decision: 'Focus : anneau Border/Focus 2 px sur le calque.',
    statut: 'conforme',
    realisation: 'Contour 2 px --amf-border-focus sur le calque au focus clavier.',
  },
  {
    date: '12/09',
    entree: 'Checkbox, Radio, Switch',
    decision: 'Switch : style M3 unique, piste 44 × 24, curseur 16 / 20, icône facultative.',
    statut: 'conforme',
    realisation: 'Jetons --mat-slide-toggle-* ; icône masquée par défaut (provideAmfMaterial).',
  },
  {
    date: '12/09',
    entree: 'Checkbox, Radio, Switch',
    decision: 'Libellé à gauche ou à droite (Label Position).',
    statut: 'conforme',
    realisation: 'labelPosition="before" de Material.',
  },
  // Toggle Button
  {
    date: '24/09',
    entree: 'Retours : Toggle Button',
    decision:
      'Items Surface + Foreground/Primary, survol Neutral Subtle, sélection Action/<C>/Default, contour et séparateurs Border/Input.',
    statut: 'conforme',
    realisation:
      'Jetons --mat-button-toggle-* ; gui-secondary / gui-neutral sur le groupe ; pas de coche.',
  },
  // Tabs
  {
    date: '15/09',
    entree: 'Lot 5 : Tabs',
    decision:
      'Hauteur 48 (Size/Control/L), indicateur 2 px Action/Primary, séparateur Border/Default, états Hover et Focused.',
    statut: 'conforme',
    realisation: 'Jetons --mat-tab-* ; survol Neutral Subtle ; contour de focus 2 px.',
  },
  {
    date: '15/09',
    entree: 'Retours Chip et Tabs',
    decision:
      'Texte de l’onglet actif et indicateur de la même couleur (Foreground/Brand = Action/Primary/Default).',
    statut: 'conforme',
    realisation: 'Les deux jetons valent #B34C00.',
  },
  {
    date: '16/09',
    entree: 'Contraste des Badges',
    decision: 'Tabs : Radius/S sur les coins hauts, Radius/XS sur l’indicateur.',
    statut: 'conforme',
    realisation: 'border-radius haut 4 px ; --mat-tab-active-indicator-shape Radius/XS.',
  },
  {
    date: '15/09',
    entree: 'Lot 5 : Tabs',
    decision: 'Icône et Count dans l’onglet ; orientation verticale.',
    statut: 'hors-lot',
    realisation:
      'Icône et Count possibles par ng-template mat-tab-label, non montrés ; vertical : Material n’en a pas.',
  },
  // Badge, Tag, Count, Status
  {
    date: '12/09',
    entree: 'Count, Badge, Tag et icônes',
    decision:
      'Badge : Info / Success / Warning / Error / Neutral × Default / Inverted × 20 / 24 / 32, Disabled.',
    statut: 'conforme',
    realisation: 'Classe gui-badge.',
  },
  {
    date: '16/09',
    entree: 'Contraste des Badges',
    decision: 'Fond Feedback/Background au niveau 50, texte 700, bordure Solid.',
    statut: 'conforme',
    realisation: 'Valeurs venues des jetons ; contrastes mesurés (page Mode sombre).',
  },
  {
    date: '24/09',
    entree: 'Rationalisation couleurs',
    decision:
      'Tag : Brand + Orange, Blue, Green, Navy, Purple, Grey × Regular / Inverted × Small / Medium.',
    statut: 'conforme',
    realisation: 'Classe gui-tag et ses sept couleurs.',
  },
  {
    date: '22/09',
    entree: 'Count réduit',
    decision: 'Count : Brand, Navy et Grey × Dot / Count × S / M / L.',
    statut: 'conforme',
    realisation: 'Classe gui-count, gui-navy, gui-grey, gui-dot.',
  },
  {
    date: '24/09',
    entree: 'Retours : Status',
    decision: 'Status : cinq couleurs sémantiques, Small / Medium.',
    statut: 'conforme',
    realisation: 'Classe gui-status.',
  },
  // Card, Divider
  {
    date: '18/09',
    entree: 'Lot 5 : Card',
    decision:
      'Card Elevated / Outlined × Default / Hover × Small / Medium, Slot Tag, menu, actions.',
    statut: 'conforme',
    realisation:
      'mat-card bordée Border/Strong dans les deux styles ; Elevated en ombre Lv3 (Lv2 au survol), Outlined sans ombre (Lv3 au survol), ombres reprises des styles d’effet du .fig ; gui-sm 280 / gui-md 400 ; en-tête avec Slot Tag et mat-menu.',
  },
  {
    date: '24/09',
    entree: 'Audit Sopra, retours',
    decision: 'Card sans état Selected : la sélection passe par une Checkbox.',
    statut: 'conforme',
    realisation: 'Pas d’état sélectionné sur mat-card.',
  },
  {
    date: '12/09',
    entree: 'Divider et Badge',
    decision: 'Divider Horizontal / Vertical × Inset × Default / Subtle, retrait 16 / 8.',
    statut: 'conforme',
    realisation: 'mat-divider, classes gui-subtle et gui-inset.',
  },
  // Icônes
  {
    date: '22/09',
    entree: 'Icon Library aplatie',
    decision: '1 417 icônes Material Icons, couleur pilotée par jeton.',
    statut: 'conforme',
    realisation:
      'Police Material Icons (Apache 2.0) embarquée ; mat-icon hérite de la couleur du texte.',
  },
  // Famille formulaire (lot 2)
  {
    date: '16/09',
    entree: 'Lot 5, vague 2 : préfixe / suffixe',
    decision: 'Input Base : textes Prefix / Suffix (devise, unité) en Foreground/Secondary.',
    statut: 'conforme',
    realisation: 'matTextPrefix / matTextSuffix en Foreground/Secondary (exemple Épaisseur en mm).',
  },
  {
    date: '16/09',
    entree: 'Lot 5, vague 2 : Textarea',
    decision:
      'Textarea : Outline × 6 états, poignée de redimensionnement (hasResizeHandle), hauteur minimale 96.',
    statut: 'conforme',
    realisation:
      'textarea matInput : min-height 96 px, resize vertical (gui-no-resize pour la retirer), mêmes états que le champ.',
  },
  {
    date: '29/09',
    entree: 'Form Field : axe Type',
    decision:
      'Type Input / Textarea : libellé, aide, compteur et Tag Facultatif directement sur la zone de texte.',
    statut: 'conforme',
    realisation:
      'Même gui-field et mat-form-field pour les deux types ; compteur par mat-hint align="end".',
  },
  {
    date: '28/09',
    entree: 'Form Field : hasLabel',
    decision:
      'Libellé masquable, réservé aux champs dont le libellé est porté ailleurs (aria-label ou aria-labelledby).',
    statut: 'conforme',
    realisation:
      'Omettre le gui-field-label et poser aria-label ou aria-labelledby sur le contrôle.',
  },
  {
    date: '29/09',
    entree: 'Checkbox Group et Radio Group',
    decision: 'Orientation Vertical / Horizontal, légende, items, aide ou erreur sous le groupe.',
    statut: 'conforme',
    realisation:
      'fieldset.gui-group et legend, gui-horizontal, gui-group-helper / gui-group-error ; en erreur, cases et radios en Border/Error.',
  },
  {
    date: '28/09',
    entree: 'Select',
    decision:
      'Nouveau composant : Form Field + panneau Border/Strong Radius/M ombre Lv2 ; options Single (coche) et Multiple (Checkbox Secondary), 5 états.',
    statut: 'conforme',
    realisation:
      'mat-select : panneau et options aux jetons AMF ; option choisie en Secondary Tint, libellé Form Label On Tint ; case du choix multiple dessinée par le pseudo-checkbox Material aux couleurs de la Checkbox Secondary.',
  },
  {
    date: '28/09',
    entree: 'Select : écart du panneau',
    decision: 'Panneau resserré à 4 px sous le champ (rangée d’aide repliée sans aide).',
    statut: 'conforme',
    realisation:
      'Marge de 4 px entre champ et panneau, au-dessus comme au-dessous ; aide en subscriptSizing dynamic.',
  },
  {
    date: '15/09',
    entree: 'Lot 5 : Chip',
    decision:
      'Assist / Filter / Input × Outlined / Filled × Small 24 / Medium 32 × 4 états ; Chip Group en retour à la ligne.',
    statut: 'conforme',
    realisation:
      'mat-chip, mat-chip-option, mat-chip-row ; gui-filled, gui-sm ; écart de 8 px dans le groupe.',
  },
  {
    date: '15/09',
    entree: 'Lot 5 : Chip (écarts)',
    decision: 'Les cinq couleurs de mat-chip disparaissent : un chip est neutre.',
    statut: 'conforme',
    realisation: 'Aucune classe de couleur sur les chips.',
  },
  {
    date: '15/09',
    entree: 'Retours Chip et Tabs',
    decision:
      'Chip Filter sélectionné en Primary inversé (fond Primary, texte et coche On Primary, survol Primary Hover).',
    statut: 'conforme',
    realisation: '--mat-chip-elevated-selected-container-color Primary, survol Primary Hover.',
  },
  {
    date: '24/09',
    entree: 'Chip : débordement',
    decision: 'Groupe replié + Chip Assist « Afficher tout (n) ».',
    statut: 'conforme',
    realisation: 'Exemple Assist de la page Chip.',
  },
  {
    date: '16/09',
    entree: 'Lot 5 : Date Picker',
    decision:
      'Calendar Cell (10 états de jour dont plage), Calendar (vues Month, Range, Year, MultiYear, ombre Lv2), Date Picker Single / Range ; raccourcis en Chips Assist.',
    statut: 'adapte',
    realisation:
      'mat-datepicker et mat-date-range-picker aux jetons AMF ; raccourcis à composer par l’application (Material n’en a pas).',
  },
  {
    date: '22/09',
    entree: 'Calendar : largeur fixe commune',
    decision: 'Quatre vues en 312 px ; MultiYear en 3 × 8 années, cellules Year de 88 px.',
    statut: 'ecart',
    realisation:
      'Largeur 312 px appliquée ; Material garde 4 colonnes (mois en 4 × 3, années en 4 × 6), non réglable sans réécrire les vues.',
  },
  {
    date: '24/09',
    entree: 'Time Picker',
    decision:
      'Form Field HH:MM saisissable + liste d’heures (Menu), référence mat-timepicker ; horloge v1 retirée.',
    statut: 'conforme',
    realisation: 'mat-timepicker ; liste dans le même panneau que le Select.',
  },
  {
    date: '18/09',
    entree: 'Lot 5 : Menu',
    decision:
      'Menu Item Default / Destructive × 4 états, icône, raccourci, sous-menu ; action destructive isolée.',
    statut: 'conforme',
    realisation:
      'mat-menu ; gui-destructive, gui-menu-shortcut ; sous-menu Material (matMenuTriggerFor).',
  },
  {
    date: '29/09',
    entree: 'Menu Item : Selected',
    decision:
      'Choix courant : libellé Medium et coche à droite ; exemple « Menu de réglages en cascade ».',
    statut: 'conforme',
    realisation:
      'Classe gui-selected et span.material-icons gui-menu-check ; role menuitemradio et aria-checked.',
  },
  {
    date: '24/09',
    entree: 'Elevation : Border/Strong',
    decision: 'Menu et Calendar délimités par Border/Strong.',
    statut: 'conforme',
    realisation:
      'Bordure Border/Strong 1 px sur les panneaux Select, Menu, Calendar et Time Picker.',
  },
  {
    date: '14/09',
    entree: 'Button Dropdown',
    decision:
      'Single / Split ; Open = bouton Pressed + chevron Arrow Drop Up ; le panneau est le Menu.',
    statut: 'conforme',
    realisation:
      'Bouton Material + mat-menu ; couleur Pressed sur aria-expanded ; icône arrow_drop_up à l’ouverture.',
  },
  {
    date: '22/09',
    entree: 'Button Dropdown : couleurs',
    decision:
      'Style Filled / Outlined × Primary / Secondary / Neutral, chevron aligné sur le bouton.',
    statut: 'conforme',
    realisation: 'Mêmes classes de couleur sur l’action et le chevron (span gui-split).',
  },
  {
    date: '28/09',
    entree: 'Button Dropdown : taille',
    decision: 'Axe Size sur le composant, les deux parties suivent.',
    statut: 'conforme',
    realisation: 'Classe de taille à poser sur les deux boutons du gui-split.',
  },
  {
    date: '18/09',
    entree: 'Lot 5 : Slider',
    decision: 'Slider Thumb 5 états × 2 couleurs, étiquette de valeur ; Slider Single / Range.',
    statut: 'adapte',
    realisation:
      'mat-slider aux mesures AMF ; étiquette de valeur en mode discrete seulement (au glissement et au focus).',
  },
  {
    date: '25/09',
    entree: 'File Upload',
    decision: 'Dragover en Secondary (Tint + Default) ; message d’erreur affiché en Error.',
    statut: 'conforme',
    realisation:
      'gui-file-upload : gui-dragover, gui-error et gui-file-upload-error, gui-disabled.',
  },
  {
    date: '25/09',
    entree: 'File Item',
    decision: 'Variante Error avec Error Message (motif du refus et formats acceptés).',
    statut: 'conforme',
    realisation:
      'gui-file-item gui-error et gui-file-item-error ; barre de progression mat-progress-bar 4 px.',
  },
  // Navigation et contenus (lot 3)
  {
    date: '16/09',
    entree: 'Table',
    decision:
      'Nouvelle page Table : Header Cell, Cell (Text, Numeric, Checkbox, Badge, Actions), lignes Default / Hover / Selected, densités Default / Compact.',
    statut: 'conforme',
    realisation:
      'mat-table dans gui-table : en-têtes 48 px Form Label sur Surface Subtle, cellules 48 px Body 2, survol Neutral Subtle, sélection Secondary Tint (gui-selected), Compact 40 px (gui-compact).',
  },
  {
    date: '16/09',
    entree: 'Paginator',
    decision:
      'Table Paginator devient Paginator (mat-paginator), paginateur par défaut des tableaux et listes.',
    statut: 'conforme',
    realisation:
      'mat-paginator 48 px, liste 80 × 32, boutons 32 ; libellés français par AmfPaginatorIntl (« Lignes par page », « 1 à 10 sur 42 ») fourni par provideAmfMaterial().',
  },
  {
    date: '16/09',
    entree: 'Pagination (custom)',
    decision:
      'Pagination numérotée « hors Angular Material, à coder à la main » : Primary / Secondary, Small / Medium, Ellipsis.',
    statut: 'conforme',
    realisation:
      '<nav class="gui-pagination"> et boutons gui-pagination-item 40 / 32 px, page courante aria-current="page" pleine en Primary ou Secondary.',
  },
  {
    date: '16/09',
    entree: 'Accordion',
    decision:
      'Expansion Panel (Collapsed / Expanded, 4 interactions, Default / Compact ; titre, description, icône) et Accordion ; chevrons expand_more / expand_less.',
    statut: 'adapte',
    realisation:
      'mat-expansion-panel et mat-accordion.gui-accordion aux mesures AMF ; Material fait tourner un seul chevron au lieu de permuter expand_more / expand_less (même rendu).',
  },
  {
    date: '16/09',
    entree: 'Breadcrumb',
    decision:
      'Items Link / Current, chevron_right en séparateur, liens en Foreground/Link ; Item Ellipsis et variante Collapsed au-delà de 4 niveaux.',
    statut: 'conforme',
    realisation:
      '<nav class="gui-breadcrumb"><ol>, séparateur généré par le CSS, bouton gui-breadcrumb-ellipsis qui ouvre un mat-menu.',
  },
  {
    date: '16/09',
    entree: 'Title',
    decision:
      'En-tête de page Desktop H4 / Tablet H5 (Mobile retiré en revue) : Breadcrumb, retour, Slot Tag, sous-titre, actions Outlined Neutral + Filled Primary.',
    statut: 'conforme',
    realisation:
      '<header class="gui-title"> ; gui-tablet passe le titre en H5. Le niveau du titre (h1, h2) reste celui de la page.',
  },
  {
    date: '16/09',
    entree: 'Stepper',
    decision:
      'Step (Active, Completed, Upcoming, Error, Disabled ; Optional) et Stepper horizontal / vertical avec Continuer / Précédent.',
    statut: 'adapte',
    realisation:
      'mat-stepper aux couleurs AMF ; coche des étapes terminées par matStepperIcon (Material affiche un crayon) ; pas d’étape désactivée dans Material (style prêt pour aria-disabled).',
  },
  {
    date: '18/09',
    entree: 'List',
    decision:
      'List Item (une ou deux lignes, Default / Hover / Selected / Disabled, Default / Compact, Slot Icon et Slot Trailing) ; sous-en-tête et séparateurs.',
    statut: 'conforme',
    realisation:
      'mat-list, mat-nav-list (activated = Secondary Tint), mat-action-list ; 48 / 40 / 64 px, sous-en-tête Form Label Caps, mat-divider Border/Subtle.',
  },
  {
    date: '24/09',
    entree: 'Table',
    decision:
      'Structure en colonnes : séparateurs intégrés aux cellules, Header Cell avec fond et variante Checkbox.',
    statut: 'conforme',
    realisation:
      'Séparateurs Border/Default sous l’en-tête et Border/Subtle entre lignes ; colonne de cases de 56 (gui-col-checkbox).',
  },
  {
    date: '24/09',
    entree: 'Table',
    decision:
      'Sort=Sortable : unfold_more en Foreground/Disabled sur les colonnes triables non triées.',
    statut: 'adapte',
    realisation:
      'Material n’affiche sa flèche qu’au survol : amf-design-system ajoute unfold_more par le CSS tant que la colonne n’est pas triée ; flèche avant le libellé des colonnes numériques (arrowPosition="before").',
  },
  {
    date: '24/09',
    entree: 'Table, List, Accordion, Stepper',
    decision: 'Conteneurs délimités par Border/Strong.',
    statut: 'conforme',
    realisation:
      'gui-table, gui-accordion, mat-stepper, mat-expansion-panel et listes gui-outlined bordés Border/Strong.',
  },
  {
    date: '25/09',
    entree: 'Side Menu',
    decision:
      'Item actif en pilule pleine Action/Primary/Default, icône et libellé On Primary en Medium ; Count Grey ; Radius/M, retrait 8 ; survol Neutral Subtle ; repliés 48 px centrés, Count en haut à droite.',
    statut: 'conforme',
    realisation:
      '<nav class="gui-side-menu"> : gui-side-menu-item avec aria-current="page", gui-collapsed pour la version de 64 px (libellés gardés pour les aides techniques).',
  },
  {
    date: '25/09',
    entree: 'Table, List',
    decision:
      'Action/Secondary/Tint passe à Blue/50 (ligne sélectionnée, élément de liste courant).',
    statut: 'conforme',
    realisation:
      'Valeur venue des jetons générés ; en sombre, Secondary Tint à 16 % (audit de contraste).',
  },
  {
    date: '28/09',
    entree: 'Side Menu Item',
    decision: 'Tailles S / M / L (32 / 40 / 48 px, icônes 20 / 20 / 24, Caption en S) ; hasIcon.',
    statut: 'conforme',
    realisation: 'gui-side-menu par défaut (L), gui-md, gui-sm ; icône facultative.',
  },
  {
    date: '28/09',
    entree: 'Side Menu',
    decision:
      'Lien de retour facultatif « Accueil » (arrow_back, Foreground/Link) ; Icon Right chevron_right après le Count.',
    statut: 'conforme',
    realisation:
      'gui-side-menu-back (flèche seule en 40 px une fois replié) et gui-side-menu-trailing.',
  },
  {
    date: '29/09',
    entree: 'List',
    decision: 'hasElevation : Background/Surface, Radius/M, ombre Lv2.',
    statut: 'conforme',
    realisation: 'Classe gui-elevated.',
  },
  {
    date: '05/10',
    entree: 'Table',
    decision:
      'En-tête facultatif : titre (Subtitle Medium après revue), description Body 2, Slot Actions (Button Outlined Neutral Small), séparé par Border/Default ; hasPaginator.',
    statut: 'conforme',
    realisation:
      'gui-table-header, gui-table-title (niveau h2 / h3 au choix de la page), gui-table-description, gui-table-actions ; paginateur facultatif.',
  },
  {
    date: '05/10',
    entree: 'Table',
    decision: 'Pastille décorative en quart de cercle (hasIcon) pour les tableaux de tête de page.',
    statut: 'adapte',
    realisation:
      'span gui-table-badge (aria-hidden) ; dégradé hors jetons recopié du Figma (#5B2A86, #D63A3A, #F3923C), version simplifiée du style Gradient de l’ancien thème AMF ; reprise demandée par Gunther le 12/11 malgré ses réserves esthétiques.',
  },
  {
    date: '05/10',
    entree: 'Table Cell',
    decision: 'Types Expand, Nested, None et Input (Input Base Small).',
    statut: 'adapte',
    realisation:
      'Bascule 32 px (gui-col-expand), lignes filles gui-nested-row / gui-nested calculées par le composant (Material n’a pas de lignes filles) ; champ 32 px dans la cellule.',
  },
  // Messages et overlays (lot 4)
  {
    date: '14/09',
    entree: 'Message Info',
    decision:
      'L’Alert du 14/09 devient Message Info : message persistant, Filled / Soft / Outlined × 5 types × Small / Medium ; titre Alert Title (Bold 14/20), action Text et fermeture exposées.',
    statut: 'conforme',
    realisation:
      'gui-message (Filled par défaut), gui-soft, gui-outlined, gui-sm ; titre gui-message-title en Alert Title, actions gui-message-actions, bouton Fermer facultatif.',
  },
  {
    date: '14/09',
    entree: 'Alert',
    decision:
      'Nouvel Alert (toast) : Light / Dark × 5 types, 360 px, hasIcon, titre, message, action Text, fermeture ; Alert Stack de 1 à 3, écart 8, haut ou bas à droite à 24 px.',
    statut: 'conforme',
    realisation:
      'gui-alert (Light : Surface, Border/Strong, ombre Lv2) et gui-alert gui-inverse (Dark) ; pile gui-alert-stack fixe (gui-top pour le haut), trois alertes au plus, région aria-live.',
  },
  {
    date: '14/09',
    entree: 'Alert Dark',
    decision:
      'Background/Inverse en Steel/900 ; icônes de l’Alert Dark en Feedback/<Type>/Inverse (≥ 5,9:1).',
    statut: 'adapte',
    realisation:
      'Les variables Feedback/<Type>/Inverse sont supprimées du .fig mais toujours référencées : amf-design-system reprend les teintes 300 (Blue, Green, Gold, Ruby, Steel) ; en mode sombre, où le fond inverse devient clair, les pleins du mode clair (audit de contraste).',
  },
  {
    date: '14/09',
    entree: 'Disclaimer',
    decision:
      'Nouvelle page Disclaimer : 5 types, icône en slot, Caption Italic en Feedback Foreground sur Feedback Background.',
    statut: 'conforme',
    realisation: 'gui-disclaimer : Radius/S, marges 16 / 8, icône 18, Caption Italic.',
  },
  {
    date: '14/09',
    entree: 'Snackbar',
    decision:
      'Snackbar déprécié : la notification éphémère passe à Alert, dont le Style Dark correspond au snackbar Material.',
    statut: 'conforme',
    realisation: 'MatSnackBar non habillé ; Alert Dark (gui-inverse) dans une gui-alert-stack.',
  },
  {
    date: '15/09',
    entree: 'Message Info, Disclaimer',
    decision: 'Largeurs par composant retirées des jetons, valeurs laissées en dur (480 et 800).',
    statut: 'adapte',
    realisation:
      'Message Info et Disclaimer prennent la largeur de leur conteneur ; l’Alert garde 360 px (max 100 %).',
  },
  {
    date: '18/09',
    entree: 'Modale',
    decision:
      'Dialog : Standard × S / M / L, Confirmation et Destructive × S / M, fermeture et actions exposées ; Dialog Overlay sur Background/Overlay.',
    statut: 'conforme',
    realisation:
      'MatDialog : panelClass gui-modale-sm / md / lg (400 / 560 / 800), Radius/L, Border/Strong, ombre Lv1, en-tête gui-modale-header (icône, Fermer 40), actions séparées par Border/Subtle, voile Background/Overlay.',
  },
  {
    date: '18/09',
    entree: 'Tooltip',
    decision: 'Tooltip : Plain / Rich × flèche None / Top / Bottom / Left / Right.',
    statut: 'adapte',
    realisation:
      'Plain : mat-tooltip aux couleurs AMF, flèche ajoutée par le CSS (matTooltipClass gui-tooltip-arrow, suit la position réelle). Rich : Material n’en a pas, toggletip ouvert au clic (cdkConnectedOverlay, gui-tooltip-rich).',
  },
  {
    date: '18/09',
    entree: 'Loader',
    decision:
      'Progress Spinner Indeterminate / Determinate × Primary / Secondary / Inverse × 24 / 40 / 64 ; Progress Bar Determinate / Indeterminate / Buffer.',
    statut: 'conforme',
    realisation:
      'Tous les modes conformes (piste du spinner ajoutée par le CSS, Material n’en dessine pas). Indéterminés animés par défaut, figés avec provideAmfMaterial({ animations: false }) pour les postes RDS sans GPU.',
  },
  {
    date: '22/09',
    entree: 'Progress Spinner',
    decision: 'Variante Inverse transparente, posée sur une surface sombre.',
    statut: 'conforme',
    realisation: 'gui-inverse : Foreground/Inverse, piste à 24 %, sans fond propre.',
  },
  {
    date: '24/09',
    entree: 'Alert, Message Info',
    decision:
      'Alert sans disparition automatique, Fermer toujours présent ; hasTitle vrai par défaut, titre = mot du type.',
    statut: 'conforme',
    realisation:
      'Aucune minuterie dans amf-design-system ; exemples titrés Information, Succès, Attention, Erreur.',
  },
  {
    date: '24/09',
    entree: 'Alert, Message Info',
    decision: 'Type Neutral titré « Remarque ».',
    statut: 'conforme',
    realisation: 'Exemples Neutral titrés Remarque.',
  },
  {
    date: '06/10',
    entree: 'Message Info',
    decision:
      'Feedback/Info/Background en Blue/50 ; Soft avec barre d’accent de 4 px Feedback/<Type>/Solid à gauche.',
    statut: 'conforme',
    realisation: 'Fond venu des jetons générés ; barre d’accent par une bordure gauche de 4 px.',
  },
  {
    date: '06/10',
    entree: 'Empty State',
    decision:
      'Table Empty State devient Empty State (Empty / Loading / Error) : illustration ronde, titre, message, action.',
    statut: 'conforme',
    realisation:
      'gui-empty-state : illustration 64 (icône 32 ou spinner 40, gui-error), titre Body 1 Medium, message Body 2, action Outlined Neutral ; état de chargement en role="status".',
  },
  {
    date: '06/10',
    entree: 'Modale',
    decision: 'Dialog renommé Modale, Dialog Overlay → Modale Overlay.',
    statut: 'conforme',
    realisation: 'Page Modale et classes gui-modale-*.',
  },
  // Structure et affichage (lot 5)
  {
    date: '18/09',
    entree: 'Avatar',
    decision:
      'Avatar : 52 variantes (Initials / Icon × 6 couleurs × XS / S / M / L, Image × Neutral).',
    statut: 'conforme',
    realisation:
      'gui-avatar 24 / 32 / 40 / 56 (gui-xs, gui-sm, défaut, gui-lg) ; Primary par défaut, gui-secondary, gui-neutral, gui-green, gui-navy, gui-purple ; gui-image pour une photo.',
  },
  {
    date: '18/09',
    entree: 'Rating',
    decision:
      'Rating Star (Empty / Half / Filled × 3 tailles) et Rating (Read-only / Interactive × 3 tailles, cinq étoiles, valeur texte).',
    statut: 'adapte',
    realisation:
      'Material n’a pas de note : gui-rating en CSS pur, étoiles dessinées par la police d’icônes ; saisie par cinq boutons radio natifs masqués (radiogroup, flèches du clavier), valeur gui-rating-value.',
  },
  {
    date: '22/09',
    entree: 'Rating',
    decision:
      'Étoiles pleines en Amber/600 (Gold/600 après renommage), contours en Foreground/Secondary.',
    statut: 'adapte',
    realisation:
      'Gold/600 est une primitive sans jeton sémantique : variable --gui-rating-filled ; Gold/300 en mode sombre (proposition amf-design-system, audit de contraste).',
  },
  {
    date: '29/09',
    entree: 'Selectable Card',
    decision:
      'Selectable Card : Radio / Checkbox × Selected × Default / Hover / Focused / Disabled ; Title, Value (H3), Description ; sélection par bordure 2 px Action/Primary/Default.',
    statut: 'adapte',
    realisation:
      'gui-selectable-card en CSS pur autour d’un mat-radio-button ou d’un mat-checkbox ; états par :has() sur le contrôle ; le clic sur toute la carte est relayé par l’application ((click) dans l’exemple).',
  },
  {
    date: '25/09',
    entree: 'Header',
    decision:
      'Header (GLOBAL v2) : marque, CTA, étiquette de site, notifications avec Count Brand, compte avec Avatar ; Desktop 64 / Tablet 56.',
    statut: 'conforme',
    realisation:
      '<header class="gui-header"> 64 px, gui-tablet 56 ; actions en slot sans retour à la ligne ; logotype ArcelorMittal (blanc en mode sombre).',
  },
  {
    date: '25/09',
    entree: 'Footer',
    decision:
      'Footer (GLOBAL v2) : mention, liens et mention de conformité (Non / Partiellement / Totalement conforme).',
    statut: 'conforme',
    realisation: '<footer class="gui-footer"> 40 px sur Surface Subtle, liens gui-footer-links.',
  },
  {
    date: '25/09',
    entree: 'Footer',
    decision: 'Foreground/Link passe à Orange/600 : liens du Footer en cuivre.',
    statut: 'conforme',
    realisation: 'Valeur venue des jetons générés.',
  },
  {
    date: '25/09',
    entree: 'Expandable List',
    decision:
      'Expandable List (Items 3 / 4 / 5, premier déplié) ; bandeau d’accent Feedback étiré sur toute la hauteur, masqué sans résultat ; Toggle Button de résultat en Neutral.',
    statut: 'conforme',
    realisation:
      'gui-expandable-list et gui-expandable-item : bandeau de 4 px par ::before (gui-success, gui-error), mat-button-toggle-group Neutral, contenu déplié séparé sans chevaucher le bandeau.',
  },
  {
    date: '25/09',
    entree: 'Scrollbar',
    decision:
      'Scrollbar : curseur Foreground/Secondary sur piste Surface Subtle, barre dans une gouttière de 12 px.',
    statut: 'conforme',
    realisation:
      'Classe gui-scrollbar (::-webkit-scrollbar, scrollbar-color pour les autres moteurs) ; longueur du curseur calculée par le navigateur.',
  },
  {
    date: '05/10',
    entree: 'Section',
    decision:
      'Section : carte de page à en-tête configurable (pastille, titre, description, Slot Actions, Replier / Déplier) et Slot Content, Expanded / Collapsed ; titre en Subtitle Medium après revue.',
    statut: 'conforme',
    realisation:
      'gui-section, gui-section-header, gui-section-title (niveau h2 / h3 au choix de la page), gui-collapsed ; bouton Replier / Déplier avec aria-expanded.',
  },
  {
    date: '05/10',
    entree: 'Section',
    decision: 'Pastille d’en-tête en dégradé violet → rouge → orange, rayon intérieur 9 px.',
    statut: 'adapte',
    realisation:
      'gui-section-badge partage le dégradé hors jetons de gui-table-badge (même décision que la pastille de Table).',
  },
  {
    date: '05/10',
    entree: 'Divider',
    decision:
      'Divider Type Title : titre en capitales Foreground/Brand et filet, ramené à Form Label Caps sur retour de revue.',
    statut: 'conforme',
    realisation:
      'gui-divider-title en Form Label Caps (Medium 14/20, capitales, interlettrage 0,5), filet Border/Default ou gui-subtle, gui-inset.',
  },
  // Composants métier (lot 6)
  {
    date: '25/09',
    entree: 'CTA Bloc',
    decision:
      'CTA Bloc (GLOBAL v2) : Medium / Large × Default / Hover / Focused / Selected / Disabled, icône et libellé.',
    statut: 'conforme',
    realisation:
      'button.gui-cta-bloc 128 × 106 ou 160 × 120 (gui-lg), icône Foreground/Brand, libellé centré Caption / Form Label, bordure Border/Input, survol Neutral Subtle, focus 2 px Border/Focus.',
  },
  {
    date: '25/09',
    entree: 'CTA Bloc',
    decision: 'CTA Bloc Selected en Secondary (Tint + Default).',
    statut: 'conforme',
    realisation:
      'aria-pressed="true" (ou gui-selected) : Secondary Tint et bordure 2 Secondary Default.',
  },
  {
    date: '25/09',
    entree: 'Reorderable List',
    decision:
      'Reorderable List et Reorderable List Item (GLOBAL v2) : Default / Hover / Focused / Dragging / Disabled ; poignée, sous-titre, titre, Count, Status, Toggle Switch.',
    statut: 'adapte',
    realisation:
      'gui-reorderable-list sur le glisser-déposer du CDK, transitions coupées avec animations: false (postes RDS) ; Dragging en Primary Tint, bordure 2 Primary Default, ombre Lv2 ; déplacement au clavier par la poignée (flèches haut et bas), que le CDK ne fournit pas.',
  },
  {
    date: '25/09',
    entree: 'Task Card',
    decision:
      'Task Card (BUSINESS) : 6 couleurs × Default / Hover ; bandeau d’accent, Tag de zone, menu, trois champs, Status, action.',
    statut: 'conforme',
    realisation:
      'gui-task-card 360 px, bandeau de 4 px Accent/<Color>/Strong, Tag Regular Small de la couleur, champs en liste de définitions, ombre Lv2 au survol.',
  },
  {
    date: '25/09',
    entree: 'Login Panel',
    decision: 'Login Panel (GLOBAL v2) : SSO / Credentials / Access Denied.',
    statut: 'conforme',
    realisation:
      'gui-login-panel 480 px, marges 40, écart 24 ; bouton SSO de 440 px qui déborde de 20 px dans les marges, comme le Figma (gui-login-sso, libellé à la ligne si le panneau rétrécit) ; logotype ArcelorMittal (blanc en mode sombre).',
  },
  {
    date: '28/09',
    entree: 'Login Panel',
    decision: 'Rayon des champs passé à Radius/M (8 px), Login compris.',
    statut: 'conforme',
    realisation: 'Form Fields Large d’amf-design-system à Radius/M.',
  },
  {
    date: '25/09',
    entree: 'Agenda',
    decision:
      'Agenda (CORE) : Agenda Event (6 Accent × Timed / All-day), Agenda Day Cell (Default / Today / Outside / Selected, trois événements, « n de plus »), Agenda Header (Aujourd’hui, navigation, titre, vues), vue mois de six semaines en tableau, Border/Strong.',
    statut: 'adapte',
    realisation:
      'Material n’a pas d’agenda (mat-calendar est un sélecteur) : tableau HTML habillé (gui-agenda) ; jours hors du mois en boutons inactifs (couleur Disabled du Figma) ; au-delà de trois événements, l’exemple en montre deux et « n de plus » (règle à confirmer, le Figma ne la décrit pas).',
  },
  {
    date: '25/09',
    entree: 'Agenda',
    decision: 'Vues Semaine et Jour à composer avec les mêmes briques.',
    statut: 'hors-lot',
    realisation: 'Non dessinées dans le Figma : boutons Semaine et Jour désactivés dans l’exemple.',
  },
  {
    date: '25/09',
    entree: 'Agenda',
    decision:
      'Action/Secondary/Tint en Blue/50 (jour sélectionné) ; « n de plus » en Foreground/Link (cuivre).',
    statut: 'conforme',
    realisation: 'Valeurs venues des jetons générés.',
  },
  {
    date: '05/10',
    entree: 'Agenda Event',
    decision: 'Styles Label 11 Medium et Label 11 pour les événements d’agenda.',
    statut: 'conforme',
    realisation: 'Heure en Label 11 Medium, titre en Label 11, coupé par des points de suspension.',
  },
  {
    date: '06/10',
    entree: 'Chat Bubble',
    decision:
      'Refonte : avatar rond 32 (auto_awesome sur Action/Primary ou Avatar Initials), bulle Radius/L au coin adouci côté auteur, heure sous la bulle, sources en Chips Assist numérotées, actions Copier / Utile / Pas utile / Régénérer.',
    statut: 'adapte',
    realisation:
      'gui-chat-message : coin de 4 px côté auteur, colonne limitée à 80 % du fil (le Figma n’en fixe pas) ; fil en role="log", auteur de chaque message en texte masqué.',
  },
  {
    date: '06/10',
    entree: 'Chat Bubble',
    decision: 'States Default / Typing (trois points) / Error (message d’erreur et Réessayer).',
    statut: 'conforme',
    realisation:
      'gui-chat-typing (points fixes, comme le Figma, sans animation pour les postes RDS, annoncés en role="status") et gui-chat-error (Feedback/Error/Foreground, Button Text Neutral Small).',
  },
];
