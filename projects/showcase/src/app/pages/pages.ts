/** Pages composants de la vitrine : page 🆕 du Figma AMF suivie, réglage Material, écarts connus. */
/** Familles du menu, dans l'ordre d'affichage. */
export const FAMILLES = ['Actions', 'Formulaires', 'Navigation et contenus', 'Retours'] as const;
export type Famille = (typeof FAMILLES)[number];

export interface PageComposant {
  id: string;
  titre: string;
  famille: Famille;
  figma: string;
  resume: string;
  material?: string;
  ecarts?: string[];
}

export const PAGES: PageComposant[] = [
  {
    id: 'bouton',
    titre: 'Button',
    famille: 'Actions',
    figma: '🆕 Button (set Button, 240 variantes ; Tonal retiré le 14/09)',
    resume:
      'Bouton Material (matButton) aux mesures AMF : 32 / 40 / 48 px, rayon Radius/Button, libellé BUTTON 2 en capitales, couleur du conteneur qui change au survol et à l’appui, anneau de focus Border/Focus.',
    material: "import { MatButtonModule } from '@angular/material/button';",
    ecarts: [
      'Le mode Rounded du Figma (boutons en pilule) se règle par la classe amf-rounded sur un conteneur, comme dans le Figma (mode de variables), pas par variante.',
    ],
  },
  {
    id: 'bouton-icone',
    titre: 'Button Icon',
    famille: 'Actions',
    figma: '🆕 Button Icon (240 variantes, Disabled n’est plus une couleur)',
    resume:
      'Bouton d’icône Material (matIconButton) : Standard, Filled (gui-filled) ou Outlined (gui-outlined), carré au rayon Radius/Button.',
    material:
      "import { MatButtonModule } from '@angular/material/button';\nimport { MatIconModule } from '@angular/material/icon';",
  },
  {
    id: 'champ',
    titre: 'Form Field',
    famille: 'Formulaires',
    figma: '🆕 Input Base (72 variantes) et 🆕 Form Field (18 variantes)',
    resume:
      'Champ Material en apparence outlined (la seule du Form Field AMF), libellé au-dessus du champ en Form Label, aide et erreur en Caption dessous.',
    material:
      "import { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatInputModule } from '@angular/material/input';",
    ecarts: [
      'Libellé : AMF le place au-dessus du champ, Material le fait flotter dans la bordure. galma-ui suit AMF avec un <label for> (classe gui-field-label) et un mat-form-field sans <mat-label>.',
      'Apparence Fill du Figma non reprise (Outline seule).',
      'Textarea (Form Field Type=Textarea) : textarea matInput dans le même mat-form-field, hauteur minimale 96 px.',
    ],
  },
  {
    id: 'case',
    titre: 'Checkbox',
    famille: 'Formulaires',
    figma: '🆕 Checkbox (60 variantes, state layer réduit le 14/09)',
    resume:
      'Case Material : 18 px, Radius/XS, bord 2 px, calque d’état de 32 px au survol et au focus, anneau Border/Focus au clavier.',
    material: "import { MatCheckboxModule } from '@angular/material/checkbox';",
  },
  {
    id: 'radio',
    titre: 'Radio',
    famille: 'Formulaires',
    figma: '🆕 Radio (40 variantes)',
    resume: 'Bouton radio Material : cercle 20 px, point 10 px, mêmes états que la Checkbox.',
    material: "import { MatRadioModule } from '@angular/material/radio';",
  },
  {
    id: 'interrupteur',
    titre: 'Toggle Switch',
    famille: 'Formulaires',
    figma: '🆕 Toggle Switch (style M3 unique, piste 44 × 24, curseur 16 / 20)',
    resume:
      'Interrupteur Material (mat-slide-toggle) redimensionné aux mesures AMF, sans icône dans le curseur.',
    material: "import { MatSlideToggleModule } from '@angular/material/slide-toggle';",
  },
  {
    id: 'bouton-bascule',
    titre: 'Toggle Button',
    famille: 'Actions',
    figma: '🆕 Toggle Button et Toggle Button Group',
    resume:
      'Groupe de boutons à bascule Material : items bordés Border/Input, sélection pleine Primary, Secondary ou Neutral, sans coche.',
    material: "import { MatButtonToggleModule } from '@angular/material/button-toggle';",
  },
  {
    id: 'onglets',
    titre: 'Tabs',
    famille: 'Navigation et contenus',
    figma: '🆕 Tab et Tab Bar (style line par défaut)',
    resume:
      'Onglets Material : 48 px, BUTTON 2 en capitales, actif Foreground/Brand avec indicateur primaire 2 px, sans animation.',
    material: "import { MatTabsModule } from '@angular/material/tabs';",
  },
  {
    id: 'carte',
    titre: 'Card',
    famille: 'Navigation et contenus',
    figma: '🆕 Card (Elevated / Outlined, élévation par Border/Strong)',
    resume:
      'Carte Material (appearance="outlined") : Radius/L, bord Border/Strong, marges et espacement 16 px, titre Body 1 Medium.',
    material: "import { MatCardModule } from '@angular/material/card';",
  },
  {
    id: 'badge',
    titre: 'Badge',
    famille: 'Retours',
    figma: '🆕 Badge (Info / Success / Warning / Error / Neutral × Default / Inverted × S / M / L)',
    resume:
      'Pastille d’état en CSS pur (classe gui-badge) : Material n’a pas d’équivalent (son matBadge correspond au Count).',
  },
  {
    id: 'tag',
    titre: 'Tag',
    famille: 'Retours',
    figma: '🆕 Tag (Brand + couleurs Accent × Regular / Inverted)',
    resume: 'Étiquette de classement en CSS pur (classe gui-tag).',
  },
  {
    id: 'compteur',
    titre: 'Count',
    famille: 'Retours',
    figma: '🆕 Count (Dot / Count × Brand / Grey × S / M / L)',
    resume: 'Pastille de nombre ou point de notification en CSS pur (classe gui-count).',
  },
  {
    id: 'statut',
    titre: 'Status',
    famille: 'Retours',
    figma: '🆕 Status (point + libellé, Small / Medium)',
    resume:
      'Statut en CSS pur (classe gui-status). À ne pas confondre avec les états process Galma2 (marche, arrêt, alarme), propres à galma-ui.',
  },
  {
    id: 'separateur',
    titre: 'Divider',
    famille: 'Navigation et contenus',
    figma: '🆕 Divider (Horizontal / Vertical × Default / Subtle)',
    resume: 'Séparateur Material (mat-divider), 1 px Border/Default.',
    material: "import { MatDividerModule } from '@angular/material/divider';",
  },
  {
    id: 'select',
    titre: 'Select',
    famille: 'Formulaires',
    figma: '🆕 Select (Single / Multiple × Closed / Open) et Select Option (journal du 28/09)',
    resume:
      'Liste déroulante Material (mat-select) dans un Form Field : panneau 4 px sous le champ, Border/Strong, Radius/M, ombre Lv2, options de 40 px ; option choisie en Secondary Tint, coche à droite en choix unique, case en choix multiple.',
    material:
      "import { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatSelectModule } from '@angular/material/select';",
    ecarts: [
      'Le libellé reste au-dessus du champ : relier le mat-select à son libellé par aria-labelledby (un <label for> ne s’applique pas à un mat-select).',
      'Flèche du champ : triangle Material (même dessin qu’Arrow Drop Down), en Foreground/Secondary.',
    ],
  },
  {
    id: 'curseur',
    titre: 'Slider',
    famille: 'Formulaires',
    figma: '🆕 Slider (Single / Range × Primary / Secondary) et Slider Thumb (journal du 18/09)',
    resume:
      'Curseur Material (mat-slider) : piste 4 px Radius/XS, curseur 20 px bordé 2 px Background/Surface, calque d’état 40 px, étiquette de valeur sur Background/Inverse en Caption.',
    material: "import { MatSliderModule } from '@angular/material/slider';",
    ecarts: [
      'L’étiquette de valeur n’apparaît qu’en mode discrete (attribut du mat-slider), pendant le glissement ou au focus, comme l’état Active du Figma.',
    ],
  },
  {
    id: 'date',
    titre: 'Date Picker',
    famille: 'Formulaires',
    figma: '🆕 Date Picker, Calendar et Calendar Cell (journal du 16/09, largeur 312 px le 22/09)',
    resume:
      'Sélecteur de date Material (mat-datepicker, mat-date-range-picker) : calendrier 312 px, cellules 40 px à pastille 36, jour choisi en Primary plein, aujourd’hui cerclé Border/Input, plage en Primary Tint.',
    material:
      "import { MatDatepickerModule } from '@angular/material/datepicker';\nimport { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';",
    ecarts: [
      'Un adaptateur de dates est obligatoire. provideNativeDateAdapter() suffit à l’affichage, mais la saisie clavier jj/mm/aaaa demande un adaptateur qui sait lire ce format (Luxon, date-fns ou Moment) : choix à faire par les applications, Inconnu (à confirmer).',
      'Raccourcis du Figma (Chips Assist « Aujourd’hui »…) : à composer au-dessus du calendrier, Material n’en propose pas.',
    ],
  },
  {
    id: 'heure',
    titre: 'Time Picker',
    famille: 'Formulaires',
    figma: '🆕 Time Picker (Closed / Open, journal du 24/09)',
    resume:
      'Sélecteur d’heure Material (mat-timepicker) : champ HH:MM saisissable et liste d’heures dans le même panneau que le Select.',
    material:
      "import { MatTimepickerModule } from '@angular/material/timepicker';\nimport { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';",
  },
  {
    id: 'chip',
    titre: 'Chip',
    famille: 'Formulaires',
    figma:
      '🆕 Chip (Assist / Filter / Input × Outlined / Filled × Small / Medium) et Chip Group (journal du 15/09)',
    resume:
      'Chips Material (mat-chip, mat-chip-option, mat-chip-row) : pilule 32 ou 24 px, bord Border/Input, neutres ; filtre sélectionné en Primary plein avec coche.',
    material: "import { MatChipsModule } from '@angular/material/chips';",
    ecarts: [
      'Les cinq couleurs de chip de l’ancien kit ont disparu côté AMF : pas de classe de couleur, la couleur revient à Tag et Badge.',
    ],
  },
  {
    id: 'fichier',
    titre: 'File Upload',
    famille: 'Formulaires',
    figma: '🆕 File Upload et File Item (journal du 25/09)',
    resume:
      'Zone de dépôt et liste de fichiers en CSS pur (classes gui-file-upload, gui-file-item) : Material n’a pas d’équivalent. Barre de progression Material (mat-progress-bar) dans le File Item.',
    material:
      "import { MatButtonModule } from '@angular/material/button';\nimport { MatProgressBarModule } from '@angular/material/progress-bar';",
    ecarts: [
      'Le glisser-déposer et l’envoi restent au code de l’application ; la vitrine montre les états (gui-dragover, gui-error, gui-disabled).',
    ],
  },
  {
    id: 'bouton-menu',
    titre: 'Button Dropdown',
    famille: 'Actions',
    figma:
      '🆕 Button Dropdown (Single / Split × Filled / Outlined × 3 couleurs × 3 tailles, journal des 14/09, 22/09, 28/09)',
    resume:
      'Bouton Material qui ouvre un mat-menu : chevron Arrow Drop Down, Arrow Drop Up et couleur Pressed à l’ouverture ; Split en deux boutons accolés à 1 px (span gui-split).',
    material:
      "import { MatButtonModule } from '@angular/material/button';\nimport { MatMenuModule } from '@angular/material/menu';\nimport { MatIconModule } from '@angular/material/icon';",
  },
  {
    id: 'menu',
    titre: 'Menu',
    famille: 'Actions',
    figma: '🆕 Menu et Menu Item (Default / Destructive, Selected le 29/09)',
    resume:
      'Menu Material (mat-menu) : panneau Radius/M bordé Border/Strong, ombre Lv2, items 40 px avec icône 20 px, raccourci en Caption, action destructive isolée en Action/Error, choix courant marqué (Selected).',
    material: "import { MatMenuModule } from '@angular/material/menu';",
  },
  {
    id: 'tableau',
    titre: 'Table',
    famille: 'Navigation et contenus',
    figma:
      '🆕 Table, Table Column, Table Cell et Table Header Cell (journal des 16/09, 24/09 et 05/10)',
    resume:
      'Tableau Material (mat-table) dans un conteneur gui-table (Border/Strong, Radius/L) : en-tête facultatif (titre Subtitle Medium, description, actions), en-têtes de colonne 48 px en Form Label sur Background/Surface Subtle, lignes 48 px (40 en Compact) en Body 2 séparées par Border/Subtle, survol Neutral Subtle, sélection Secondary Tint, tri mat-sort et paginateur mat-paginator en français.',
    material:
      "import { MatTableModule } from '@angular/material/table';\nimport { MatSortModule } from '@angular/material/sort';\nimport { MatPaginatorModule } from '@angular/material/paginator';",
    ecarts: [
      'Tri : Material n’affiche sa flèche qu’au survol ; galma-ui montre unfold_more (Foreground/Disabled) sur les colonnes triables non triées, comme le Figma (journal du 24/09).',
      'Lignes dépliables (Expand, Nested) : Material n’a pas de lignes filles ; la liste à plat est calculée par le composant (exemple).',
      'Nombres au format français : LOCALE_ID « fr » et registerLocaleData(localeFr) dans la configuration de l’application.',
    ],
  },
  {
    id: 'pagination',
    titre: 'Pagination',
    famille: 'Navigation et contenus',
    figma: '🆕 Pagination et Pagination Item (custom), journal du 16/09',
    resume:
      'Pagination « hors Angular Material, à coder à la main » (Figma) : <nav class="gui-pagination"> et boutons gui-pagination-item de 40 px (32 en gui-sm), page courante pleine en Primary ou Secondary, ellipse en Foreground/Secondary. Sous un tableau, préférer le Paginator Material (page Table).',
  },
  {
    id: 'fil-ariane',
    titre: 'Breadcrumb',
    famille: 'Navigation et contenus',
    figma: '🆕 Breadcrumb et Breadcrumb Item (Link, Current, Ellipsis), journal du 16/09',
    resume:
      'Fil d’Ariane en CSS pur (<nav class="gui-breadcrumb"><ol>) : Body 2, liens Foreground/Link, page courante Foreground/Secondary, chevron 16 px, anneau de focus 2 px ; niveaux repliés derrière un bouton « … » qui ouvre un mat-menu.',
    material: "import { MatMenuModule } from '@angular/material/menu';",
  },
  {
    id: 'titre',
    titre: 'Title',
    famille: 'Navigation et contenus',
    figma: '🆕 Title (Desktop, Tablet), journal du 16/09',
    resume:
      'En-tête de page en CSS pur (<header class="gui-title">) : fil d’Ariane, bouton retour 48, titre Heading H4 (H5 en Tablet) avec Tag, sous-titre, actions.',
  },
  {
    id: 'etapes',
    titre: 'Stepper',
    famille: 'Navigation et contenus',
    figma: '🆕 Step et Stepper (horizontal, vertical), journal du 16/09',
    resume:
      'Stepper Material (mat-stepper) dans un conteneur Border/Strong Radius/L : indicateurs 24 px Radius/Full, Primary pour l’étape active et les terminées (coche), Feedback/Neutral/Solid pour celles à venir, Feedback/Error/Solid en erreur, libellés Form Label, liaisons Border/Default.',
    material:
      "import { MatStepperModule } from '@angular/material/stepper';\nimport { MatIconModule } from '@angular/material/icon';",
    ecarts: [
      'Coche des étapes terminées : Material affiche un crayon (edit) ; galma-ui fournit la coche par <ng-template matStepperIcon="edit"> et "done" dans chaque stepper.',
      'Step State=Disabled : Material n’a pas d’étape désactivée ; en mode linear, les étapes suivantes ne sont pas atteignables. Le style Action/Disabled est prêt pour un en-tête aria-disabled.',
    ],
  },
  {
    id: 'accordeon',
    titre: 'Accordion',
    famille: 'Navigation et contenus',
    figma: '🆕 Expansion Panel et Accordion (Default, Compact), journal du 16/09',
    resume:
      'Panneaux Material (mat-expansion-panel) : en-tête 48 px en Body 1, description Body 2 Foreground/Secondary, chevron 24, survol Neutral Subtle, contenu Body 2 ; mat-accordion.gui-accordion bordé Border/Strong Radius/L, panneaux séparés par Border/Subtle ; Compact par gui-compact.',
    material: "import { MatExpansionModule } from '@angular/material/expansion';",
  },
  {
    id: 'liste',
    titre: 'List',
    famille: 'Navigation et contenus',
    figma:
      '🆕 List et List Item (une ou deux lignes, Default / Compact), journal des 18/09, 24/09 et 29/09',
    resume:
      'Listes Material (mat-list, mat-nav-list, mat-action-list) : éléments 48 px (40 en Compact) ou 64 px sur deux lignes, icône 24 Foreground/Secondary, titre Body 2, sous-titre Caption, survol Neutral Subtle, élément courant Secondary Tint ; liste délimitée (gui-outlined) ou élevée (gui-elevated).',
    material: "import { MatListModule } from '@angular/material/list';",
  },
  {
    id: 'menu-lateral',
    titre: 'Side Menu',
    famille: 'Navigation et contenus',
    figma:
      '🆕 Side Menu et Side Menu Item (Expanded, Collapsed, tailles L / M / S), journal des 25/09 et 28/09',
    resume:
      'Menu latéral en CSS pur (<nav class="gui-side-menu">) : 240 px (64 replié), items de 48 / 40 / 32 px Radius/M, item actif en pilule Primary, Count Grey, icône de fin, lien retour et bouton de repli. Material (mat-sidenav) ne fournit que le tiroir, pas le contenu du menu.',
    material:
      "import { MatButtonModule } from '@angular/material/button';\nimport { MatIconModule } from '@angular/material/icon';",
  },
];
