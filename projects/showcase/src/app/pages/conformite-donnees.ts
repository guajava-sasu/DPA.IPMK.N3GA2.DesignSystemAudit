/*
 * Contrôle de galma-ui 0.1.0 par rapport au journal (Changelog) du Figma AMF v2.0, entrées du 12/09 au 26/10/2026.
 * Une ligne par décision du journal qui touche les fondations ou un composant du lot 1. Statuts :
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
  galma: string;
}

export const CONFORMITE: LigneConformite[] = [
  // Fondations
  {
    date: '12/09',
    entree: 'Tokens (fondations)',
    decision: 'Primitives, Semantic (alias des primitives) et Dimensions.',
    statut: 'conforme',
    galma: 'amf-tokens.css généré depuis le .fig (380 jetons), alias conservés en var().',
  },
  {
    date: '12/09',
    entree: 'Tokens (fondations)',
    decision:
      'Mode sombre prévu en modes de variables sur AMF Semantic, sans variante de composant.',
    statut: 'adapte',
    galma:
      'Le .fig n’a pas ces modes : galma-ui surcharge les jetons sémantiques sous :root.dark, les composants ne changent pas. Proposition à faire valider (page Mode sombre).',
  },
  {
    date: '12/09',
    entree: 'Checkbox, Radio, Switch',
    decision:
      'State Layer Hover / Pressed en Alpha/Black 8 et 12, à réaliaser vers Alpha/White en sombre.',
    statut: 'conforme',
    galma: 'Calques noirs 8 / 12 % en clair, blancs en sombre (galma-material.css, :root.dark).',
  },
  {
    date: '15/09',
    entree: 'Rationalisation 160 → 128',
    decision: 'Foreground remplace Text et Icon ; Accent remplace Tag ; Tags Regular sans contour.',
    statut: 'conforme',
    galma:
      'Seuls les jetons --amf-foreground-* et --amf-accent-* sont utilisés ; gui-tag sans bordure.',
  },
  {
    date: '15/09',
    entree: 'Audit CORE, option A ; cuivre P2 ; cuivre assombri',
    decision:
      'Action/Primary/Default = Orange/600 #B34C00 (5,3:1 sur blanc), Foreground/Brand identique.',
    statut: 'conforme',
    galma:
      '--amf-action-primary-default et --amf-foreground-brand générés à #B34C00 ; mesuré 5,3:1 (page Mode sombre, mode clair).',
  },
  {
    date: '24/09',
    entree: 'Rationalisation dimensions 52 → 31',
    decision: 'Échelle Size/8 à 64 unique ; Border Width/Focus Ring fusionné dans Medium.',
    statut: 'conforme',
    galma:
      'Jetons --amf-size-* et --amf-border-width-* générés ; les composants reprennent ces valeurs.',
  },
  {
    date: '24/09',
    entree: 'Audit Sopra (RGAA 4.1.2)',
    decision: 'Élévation par Border/Strong (Steel/600) sur Card, Table, List, Dialog, Menu…',
    statut: 'conforme',
    galma:
      'Card : bordure --amf-border-strong, sans ombre. Les autres conteneurs viendront avec leurs lots.',
  },
  {
    date: '25/09',
    entree: 'Retours : Warning, sélection, liens',
    decision:
      'Warning passe en Amber ; Secondary/Tint en Blue/50 ; Foreground/Link en cuivre, lien souligné dans un paragraphe.',
    statut: 'conforme',
    galma: 'Valeurs venues des jetons ; liens soulignés (style navigateur conservé).',
  },
  {
    date: '26/10',
    entree: 'Palettes renommées',
    decision: 'Crimson → Ruby, Amber → Gold, alias sémantiques inchangés.',
    statut: 'conforme',
    galma: 'Primitives --amf-color-ruby-* et --amf-color-gold-* générées.',
  },
  // Button
  {
    date: '12/09',
    entree: 'Button Icon et Button',
    decision:
      '32 / 40 / 48 px, rayon Radius/Button, BUTTON 2, icônes de tête et de fin, largeur mini 64.',
    statut: 'conforme',
    galma: 'Jetons --mat-button-* ; classes gui-sm / gui-lg ; mat-icon et iconPositionEnd.',
  },
  {
    date: '12/09',
    entree: 'Button Icon et Button',
    decision: 'Mode Rounded (Radius/Button = Full) choisi par mode sur la frame, pas par variante.',
    statut: 'conforme',
    galma:
      'Classe amf-rounded générée depuis le mode Rounded ; bascule dans l’en-tête de la vitrine.',
  },
  {
    date: '12/09',
    entree: 'Button Icon et Button',
    decision: 'Focus : anneau Border/Focus 2 px décalé de 4 px, rayon Radius/Button Focus.',
    statut: 'adapte',
    galma:
      'Indicateur de focus Material : cadre à 4 px du bouton, trait 2 px à l’intérieur, comme le cadre « Focus Ring » du Figma (48 × 48 à -4 px). Rayon Radius/Button Focus.',
  },
  {
    date: '14/09',
    entree: 'Suppression du style Tonal',
    decision: 'Filled / Outlined / Text et Standard / Filled / Outlined seulement.',
    statut: 'conforme',
    galma: 'Pas de matButton="tonal" dans les exemples ni dans le thème.',
  },
  {
    date: '14/09',
    entree: 'Retours de revue : focus neutre',
    decision: 'Border/Focus neutre (Steel/800), ≥ 9,6:1 sur Page et Surface.',
    statut: 'conforme',
    galma: 'Tous les anneaux utilisent --amf-border-focus ; mesuré dans l’audit des contrastes.',
  },
  {
    date: '16/09',
    entree: 'Error devient Destructive',
    decision: 'Couleur Destructive sur Button et Button Icon, jetons Action/Error.',
    statut: 'conforme',
    galma: 'Classe gui-destructive reliée à --amf-action-error-*.',
  },
  {
    date: '24/09',
    entree: 'Audit Sopra, retours',
    decision: 'Bouton désactivé : gris Action/Disabled, attribut disabled côté code.',
    statut: 'conforme',
    galma: 'Attribut disabled ; couleurs --amf-action-disabled-*.',
  },
  {
    date: '12/09',
    entree: 'Button Icon et Button',
    decision:
      'Survol et appui : couleur du conteneur Hover / Pressed (Filled), Subtle / Subtle Hover (Outlined, Text, Standard).',
    statut: 'adapte',
    galma:
      'Calques d’état Material mis à 0 et couleur du conteneur changée en CSS, comme le Figma.',
  },
  // Form Field
  {
    date: '12/09',
    entree: 'Input Base et Form Field',
    decision: 'Libellé au-dessus du champ en Form Label, aide / erreur en Caption, compteur.',
    statut: 'adapte',
    galma:
      'Material fait flotter le libellé : galma-ui place un <label for> au-dessus (gui-field-label) et un mat-form-field sans mat-label ; compteur par mat-hint align="end".',
  },
  {
    date: '12/09',
    entree: 'Input Base et Form Field',
    decision: 'Appearance Outline / Fill ; Standard abandonné.',
    statut: 'hors-lot',
    galma: 'Outline seule dans ce lot ; Fill à faire si un écran en a besoin.',
  },
  {
    date: '12/09',
    entree: 'Input Base et Form Field',
    decision: 'États Hover, Focused (2 px), Error (2 px), Disabled, Readonly.',
    statut: 'conforme',
    galma:
      'Jetons --mat-form-field-outlined-* ; erreur à 2 px même sans focus ; lecture seule par la classe gui-readonly.',
  },
  {
    date: '14/09',
    entree: 'Form Field : slot Tag',
    decision: 'Tag « Facultatif » sur la ligne du libellé.',
    statut: 'conforme',
    galma: 'Classe gui-field-label-row avec un gui-tag gui-sm.',
  },
  {
    date: '24/09',
    entree: 'Audit Sopra (RGAA 4.1.2)',
    decision:
      'Astérisque et isRequired supprimés ; le formulaire annonce « Sauf indication contraire, tous les champs sont obligatoires ».',
    statut: 'conforme',
    galma: 'Pas d’astérisque ; attribut required sur l’input ; la consigne figure dans l’exemple.',
  },
  {
    date: '16/09',
    entree: 'Lot 5, vague 2 : préfixe / suffixe et Textarea',
    decision: 'Préfixe et suffixe texte (unités, devise) ; Textarea.',
    statut: 'conforme',
    galma: 'matTextPrefix / matTextSuffix en Foreground/Secondary. Textarea : hors lot.',
  },
  // Checkbox, Radio, Switch
  {
    date: '12/09',
    entree: 'Checkbox, Radio, Switch',
    decision:
      'Case 18 px Radius/XS bord 2 ; radio 20 / point 10 ; Primary / Secondary ; état Error ; Body 2.',
    statut: 'conforme',
    galma: 'Jetons --mat-checkbox-* / --mat-radio-* ; gui-secondary ; gui-error pour la case.',
  },
  {
    date: '14/09',
    entree: 'State layer réduit',
    decision: 'Calque d’état 32 px, zone de contrôle 40 px.',
    statut: 'conforme',
    galma: 'state-layer-size 32 px et marge de 4 px : contrôle de 40 px.',
  },
  {
    date: '12/09',
    entree: 'Checkbox, Radio, Switch',
    decision: 'Focus : anneau Border/Focus 2 px sur le calque.',
    statut: 'conforme',
    galma: 'Contour 2 px --amf-border-focus sur le calque au focus clavier.',
  },
  {
    date: '12/09',
    entree: 'Checkbox, Radio, Switch',
    decision: 'Switch : style M3 unique, piste 44 × 24, curseur 16 / 20, icône facultative.',
    statut: 'conforme',
    galma: 'Jetons --mat-slide-toggle-* ; icône masquée par défaut (provideGalmaMaterial).',
  },
  {
    date: '12/09',
    entree: 'Checkbox, Radio, Switch',
    decision: 'Libellé à gauche ou à droite (Label Position).',
    statut: 'conforme',
    galma: 'labelPosition="before" de Material.',
  },
  // Toggle Button
  {
    date: '24/09',
    entree: 'Retours : Toggle Button',
    decision:
      'Items Surface + Foreground/Primary, survol Neutral Subtle, sélection Action/<C>/Default, contour et séparateurs Border/Input.',
    statut: 'conforme',
    galma:
      'Jetons --mat-button-toggle-* ; gui-secondary / gui-neutral sur le groupe ; pas de coche.',
  },
  // Tabs
  {
    date: '15/09',
    entree: 'Lot 5 : Tabs',
    decision:
      'Hauteur 48 (Size/Control/L), indicateur 2 px Action/Primary, séparateur Border/Default, états Hover et Focused.',
    statut: 'conforme',
    galma: 'Jetons --mat-tab-* ; survol Neutral Subtle ; contour de focus 2 px.',
  },
  {
    date: '15/09',
    entree: 'Retours Chip et Tabs',
    decision:
      'Texte de l’onglet actif et indicateur de la même couleur (Foreground/Brand = Action/Primary/Default).',
    statut: 'conforme',
    galma: 'Les deux jetons valent #B34C00.',
  },
  {
    date: '16/09',
    entree: 'Contraste des Badges',
    decision: 'Tabs : Radius/S sur les coins hauts, Radius/XS sur l’indicateur.',
    statut: 'conforme',
    galma: 'border-radius haut 4 px ; --mat-tab-active-indicator-shape Radius/XS.',
  },
  {
    date: '15/09',
    entree: 'Lot 5 : Tabs',
    decision: 'Icône et Count dans l’onglet ; orientation verticale.',
    statut: 'hors-lot',
    galma:
      'Icône et Count possibles par ng-template mat-tab-label, non montrés ; vertical : Material n’en a pas.',
  },
  // Badge, Tag, Count, Status
  {
    date: '12/09',
    entree: 'Count, Badge, Tag et icônes',
    decision:
      'Badge : Info / Success / Warning / Error / Neutral × Default / Inverted × 20 / 24 / 32, Disabled.',
    statut: 'conforme',
    galma: 'Classe gui-badge.',
  },
  {
    date: '16/09',
    entree: 'Contraste des Badges',
    decision: 'Fond Feedback/Background au niveau 50, texte 700, bordure Solid.',
    statut: 'conforme',
    galma: 'Valeurs venues des jetons ; contrastes mesurés (page Mode sombre).',
  },
  {
    date: '24/09',
    entree: 'Rationalisation couleurs',
    decision:
      'Tag : Brand + Orange, Blue, Green, Navy, Purple, Grey × Regular / Inverted × Small / Medium.',
    statut: 'conforme',
    galma: 'Classe gui-tag et ses sept couleurs.',
  },
  {
    date: '22/09',
    entree: 'Count réduit',
    decision: 'Count : Brand, Navy et Grey × Dot / Count × S / M / L.',
    statut: 'conforme',
    galma: 'Classe gui-count, gui-navy, gui-grey, gui-dot.',
  },
  {
    date: '24/09',
    entree: 'Retours : Status',
    decision: 'Status : cinq couleurs sémantiques, Small / Medium.',
    statut: 'conforme',
    galma: 'Classe gui-status.',
  },
  // Card, Divider
  {
    date: '18/09',
    entree: 'Lot 5 : Card',
    decision:
      'Card Elevated / Outlined × Default / Hover × Small / Medium, Slot Tag, menu, actions.',
    statut: 'ecart',
    galma:
      'Une seule apparence (bordure Border/Strong, comme les deux styles du .fig) ; l’état Hover n’est pas décrit dans le journal, non implémenté.',
  },
  {
    date: '24/09',
    entree: 'Audit Sopra, retours',
    decision: 'Card sans état Selected : la sélection passe par une Checkbox.',
    statut: 'conforme',
    galma: 'Pas d’état sélectionné sur mat-card.',
  },
  {
    date: '12/09',
    entree: 'Divider et Badge',
    decision: 'Divider Horizontal / Vertical × Inset × Default / Subtle, retrait 16 / 8.',
    statut: 'conforme',
    galma: 'mat-divider, classes gui-subtle et gui-inset.',
  },
  // Icônes
  {
    date: '22/09',
    entree: 'Icon Library aplatie',
    decision: '1 417 icônes Material Icons, couleur pilotée par jeton.',
    statut: 'conforme',
    galma: 'Police Material Icons (Apache 2.0) embarquée ; mat-icon hérite de la couleur du texte.',
  },
];
