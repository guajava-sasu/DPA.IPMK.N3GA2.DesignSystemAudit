/** Pages composants de la vitrine : page 🆕 du Figma AMF suivie, réglage Material, écarts connus. */
export interface PageComposant {
  id: string;
  titre: string;
  figma: string;
  resume: string;
  material?: string;
  ecarts?: string[];
}

export const PAGES: PageComposant[] = [
  {
    id: 'bouton',
    titre: 'Button',
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
    figma: '🆕 Button Icon (240 variantes, Disabled n’est plus une couleur)',
    resume:
      'Bouton d’icône Material (matIconButton) : Standard, Filled (gui-filled) ou Outlined (gui-outlined), carré au rayon Radius/Button.',
    material:
      "import { MatButtonModule } from '@angular/material/button';\nimport { MatIconModule } from '@angular/material/icon';",
  },
  {
    id: 'champ',
    titre: 'Form Field',
    figma: '🆕 Input Base (72 variantes) et 🆕 Form Field (18 variantes)',
    resume:
      'Champ Material en apparence outlined (la seule du Form Field AMF), libellé au-dessus du champ en Form Label, aide et erreur en Caption dessous.',
    material:
      "import { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatInputModule } from '@angular/material/input';",
    ecarts: [
      'Libellé : AMF le place au-dessus du champ, Material le fait flotter dans la bordure. galma-ui suit AMF avec un <label for> (classe gui-field-label) et un mat-form-field sans <mat-label>.',
      'Apparence Fill du Figma non reprise dans ce lot (Outline seule).',
    ],
  },
  {
    id: 'case',
    titre: 'Checkbox',
    figma: '🆕 Checkbox (60 variantes, state layer réduit le 14/09)',
    resume:
      'Case Material : 18 px, Radius/XS, bord 2 px, calque d’état de 32 px au survol et au focus, anneau Border/Focus au clavier.',
    material: "import { MatCheckboxModule } from '@angular/material/checkbox';",
  },
  {
    id: 'radio',
    titre: 'Radio',
    figma: '🆕 Radio (40 variantes)',
    resume: 'Bouton radio Material : cercle 20 px, point 10 px, mêmes états que la Checkbox.',
    material: "import { MatRadioModule } from '@angular/material/radio';",
  },
  {
    id: 'interrupteur',
    titre: 'Toggle Switch',
    figma: '🆕 Toggle Switch (style M3 unique, piste 44 × 24, curseur 16 / 20)',
    resume:
      'Interrupteur Material (mat-slide-toggle) redimensionné aux mesures AMF, sans icône dans le curseur.',
    material: "import { MatSlideToggleModule } from '@angular/material/slide-toggle';",
  },
  {
    id: 'bouton-bascule',
    titre: 'Toggle Button',
    figma: '🆕 Toggle Button et Toggle Button Group',
    resume:
      'Groupe de boutons à bascule Material : items bordés Border/Input, sélection pleine Primary, Secondary ou Neutral, sans coche.',
    material: "import { MatButtonToggleModule } from '@angular/material/button-toggle';",
  },
  {
    id: 'onglets',
    titre: 'Tabs',
    figma: '🆕 Tab et Tab Bar (style line par défaut)',
    resume:
      'Onglets Material : 48 px, BUTTON 2 en capitales, actif Foreground/Brand avec indicateur primaire 2 px, sans animation.',
    material: "import { MatTabsModule } from '@angular/material/tabs';",
  },
  {
    id: 'carte',
    titre: 'Card',
    figma: '🆕 Card (Elevated / Outlined, élévation par Border/Strong)',
    resume:
      'Carte Material (appearance="outlined") : Radius/L, bord Border/Strong, marges et espacement 16 px, titre Body 1 Medium.',
    material: "import { MatCardModule } from '@angular/material/card';",
  },
  {
    id: 'badge',
    titre: 'Badge',
    figma: '🆕 Badge (Info / Success / Warning / Error / Neutral × Default / Inverted × S / M / L)',
    resume:
      'Pastille d’état en CSS pur (classe gui-badge) : Material n’a pas d’équivalent (son matBadge correspond au Count).',
  },
  {
    id: 'tag',
    titre: 'Tag',
    figma: '🆕 Tag (Brand + couleurs Accent × Regular / Inverted)',
    resume: 'Étiquette de classement en CSS pur (classe gui-tag).',
  },
  {
    id: 'compteur',
    titre: 'Count',
    figma: '🆕 Count (Dot / Count × Brand / Grey × S / M / L)',
    resume: 'Pastille de nombre ou point de notification en CSS pur (classe gui-count).',
  },
  {
    id: 'statut',
    titre: 'Status',
    figma: '🆕 Status (point + libellé, Small / Medium)',
    resume:
      'Statut en CSS pur (classe gui-status). À ne pas confondre avec les états process Galma2 (marche, arrêt, alarme), propres à galma-ui.',
  },
  {
    id: 'separateur',
    titre: 'Divider',
    figma: '🆕 Divider (Horizontal / Vertical × Default / Subtle)',
    resume: 'Séparateur Material (mat-divider), 1 px Border/Default.',
    material: "import { MatDividerModule } from '@angular/material/divider';",
  },
];
