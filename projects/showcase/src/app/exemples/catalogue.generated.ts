// GÉNÉRÉ par scripts/exemples.mjs : ne pas modifier à la main.
import { Type } from '@angular/core';
import { BadgeBase } from './badge/badge-base';
import { BadgeTailles } from './badge/badge-tailles';
import { BoutonStyles } from './bouton/bouton-styles';
import { BoutonCouleurs } from './bouton/bouton-couleurs';
import { BoutonTailles } from './bouton/bouton-tailles';
import { BoutonDesactive } from './bouton/bouton-desactive';
import { BoutonBasculeBase } from './bouton-bascule/bouton-bascule-base';
import { BoutonBasculeTailles } from './bouton-bascule/bouton-bascule-tailles';
import { BoutonIconeStyles } from './bouton-icone/bouton-icone-styles';
import { BoutonIconeTailles } from './bouton-icone/bouton-icone-tailles';
import { CarteBase } from './carte/carte-base';
import { CaseBase } from './case/case-base';
import { CaseCouleurs } from './case/case-couleurs';
import { ChampBase } from './champ/champ-base';
import { ChampIcones } from './champ/champ-icones';
import { ChampEtats } from './champ/champ-etats';
import { CompteurBase } from './compteur/compteur-base';
import { InterrupteurBase } from './interrupteur/interrupteur-base';
import { OngletsBase } from './onglets/onglets-base';
import { RadioBase } from './radio/radio-base';
import { SeparateurBase } from './separateur/separateur-base';
import { StatutBase } from './statut/statut-base';
import { TagBase } from './tag/tag-base';

export interface Exemple {
  page: string;
  id: string;
  titre: string;
  description: string;
  composant: Type<unknown>;
  ts: string;
  html: string;
  css: string;
}

export const EXEMPLES: Exemple[] = [
  {
    page: "badge",
    id: "badge-base",
    titre: "Types et styles",
    description: "Pilule : fond Feedback/<Type>/Background, bord Solid, texte Foreground. Inversé (gui-inverted) : fond Solid, texte On Solid. Icône sémantique facultative.",
    composant: BadgeBase,
    ts: "import { Component } from '@angular/core';\nimport { MatIconModule } from '@angular/material/icon';\n\n/**\n * Types et styles\n * Pilule : fond Feedback/<Type>/Background, bord Solid, texte Foreground. Inversé (gui-inverted) :\n * fond Solid, texte On Solid. Icône sémantique facultative.\n */\n@Component({\n  selector: 'ex-badge-base',\n  imports: [MatIconModule],\n  templateUrl: './badge-base.html',\n  styleUrl: './badge-base.css',\n})\nexport class BadgeBase {}\n",
    html: "<div class=\"ex\">\n  <span class=\"gui-badge gui-info\"><mat-icon aria-hidden=\"true\">info</mat-icon>Information</span>\n  <span class=\"gui-badge gui-success\"\n    ><mat-icon aria-hidden=\"true\">check_circle</mat-icon>Conforme</span\n  >\n  <span class=\"gui-badge gui-warning\"\n    ><mat-icon aria-hidden=\"true\">warning</mat-icon>À surveiller</span\n  >\n  <span class=\"gui-badge gui-error\"><mat-icon aria-hidden=\"true\">error</mat-icon>Rebut</span>\n  <span class=\"gui-badge\">Neutre</span>\n</div>\n<div class=\"ex\">\n  <span class=\"gui-badge gui-info gui-inverted\">Information</span>\n  <span class=\"gui-badge gui-success gui-inverted\">Conforme</span>\n  <span class=\"gui-badge gui-warning gui-inverted\">À surveiller</span>\n  <span class=\"gui-badge gui-error gui-inverted\">Rebut</span>\n  <span class=\"gui-badge gui-inverted\">Neutre</span>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n.ex + .ex {\n  margin-top: 12px;\n}\n",
  },
  {
    page: "badge",
    id: "badge-tailles",
    titre: "Tailles",
    description: "Small 20 px (Label 11 Medium), Medium 24 px (Caption Medium), Large 32 px (Form Label). Désactivé : gui-disabled, avec aria-disabled=\"true\" (état inactif, exempté du contraste comme dans l'audit AMF).",
    composant: BadgeTailles,
    ts: "import { Component } from '@angular/core';\nimport { MatIconModule } from '@angular/material/icon';\n\n/**\n * Tailles\n * Small 20 px (Label 11 Medium), Medium 24 px (Caption Medium), Large 32 px (Form Label). Désactivé :\n * gui-disabled, avec aria-disabled=\"true\" (état inactif, exempté du contraste comme dans l'audit AMF).\n */\n@Component({\n  selector: 'ex-badge-tailles',\n  imports: [MatIconModule],\n  templateUrl: './badge-tailles.html',\n  styleUrl: './badge-tailles.css',\n})\nexport class BadgeTailles {}\n",
    html: "<div class=\"ex\">\n  <span class=\"gui-badge gui-success gui-sm\"\n    ><mat-icon aria-hidden=\"true\">check_circle</mat-icon>Small</span\n  >\n  <span class=\"gui-badge gui-success\"\n    ><mat-icon aria-hidden=\"true\">check_circle</mat-icon>Medium</span\n  >\n  <span class=\"gui-badge gui-success gui-lg\"\n    ><mat-icon aria-hidden=\"true\">check_circle</mat-icon>Large</span\n  >\n  <span class=\"gui-badge gui-disabled\" aria-disabled=\"true\">Désactivé</span>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "bouton",
    id: "bouton-styles",
    titre: "Styles",
    description: "Filled pour l'action principale de l'écran, Outlined pour une action secondaire, Text pour une action discrète. Couleur primaire (cuivre) par défaut.",
    composant: BoutonStyles,
    ts: "import { Component } from '@angular/core';\nimport { MatButtonModule } from '@angular/material/button';\n\n/**\n * Styles\n * Filled pour l'action principale de l'écran, Outlined pour une action secondaire, Text pour une\n * action discrète. Couleur primaire (cuivre) par défaut.\n */\n@Component({\n  selector: 'ex-bouton-styles',\n  imports: [MatButtonModule],\n  templateUrl: './bouton-styles.html',\n  styleUrl: './bouton-styles.css',\n})\nexport class BoutonStyles {}\n",
    html: "<div class=\"ex\">\n  <button matButton=\"filled\">Valider</button>\n  <button matButton=\"outlined\">Annuler</button>\n  <button matButton>Détails</button>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "bouton",
    id: "bouton-couleurs",
    titre: "Couleurs",
    description: "Classes gui-secondary (bleu), gui-neutral (gris) et gui-destructive (rouge, suppression). Sans classe : primaire.",
    composant: BoutonCouleurs,
    ts: "import { Component } from '@angular/core';\nimport { MatButtonModule } from '@angular/material/button';\n\n/**\n * Couleurs\n * Classes gui-secondary (bleu), gui-neutral (gris) et gui-destructive (rouge, suppression). Sans\n * classe : primaire.\n */\n@Component({\n  selector: 'ex-bouton-couleurs',\n  imports: [MatButtonModule],\n  templateUrl: './bouton-couleurs.html',\n  styleUrl: './bouton-couleurs.css',\n})\nexport class BoutonCouleurs {}\n",
    html: "<div class=\"ex\">\n  <button matButton=\"filled\">Primaire</button>\n  <button matButton=\"filled\" class=\"gui-secondary\">Secondaire</button>\n  <button matButton=\"filled\" class=\"gui-neutral\">Neutre</button>\n  <button matButton=\"filled\" class=\"gui-destructive\">Supprimer</button>\n</div>\n<div class=\"ex\">\n  <button matButton=\"outlined\">Primaire</button>\n  <button matButton=\"outlined\" class=\"gui-secondary\">Secondaire</button>\n  <button matButton=\"outlined\" class=\"gui-neutral\">Neutre</button>\n  <button matButton=\"outlined\" class=\"gui-destructive\">Supprimer</button>\n</div>\n<div class=\"ex\">\n  <button matButton>Primaire</button>\n  <button matButton class=\"gui-secondary\">Secondaire</button>\n  <button matButton class=\"gui-neutral\">Neutre</button>\n  <button matButton class=\"gui-destructive\">Supprimer</button>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n.ex + .ex {\n  margin-top: 16px;\n}\n",
  },
  {
    page: "bouton",
    id: "bouton-tailles",
    titre: "Tailles et icônes",
    description: "Small 32 px (gui-sm), Medium 40 px (défaut), Large 48 px (gui-lg). Icône de tête ou de fin (iconPositionEnd), 16 / 20 / 24 px selon la taille.",
    composant: BoutonTailles,
    ts: "import { Component } from '@angular/core';\nimport { MatButtonModule } from '@angular/material/button';\nimport { MatIconModule } from '@angular/material/icon';\n\n/**\n * Tailles et icônes\n * Small 32 px (gui-sm), Medium 40 px (défaut), Large 48 px (gui-lg). Icône de tête ou de fin\n * (iconPositionEnd), 16 / 20 / 24 px selon la taille.\n */\n@Component({\n  selector: 'ex-bouton-tailles',\n  imports: [MatButtonModule, MatIconModule],\n  templateUrl: './bouton-tailles.html',\n  styleUrl: './bouton-tailles.css',\n})\nexport class BoutonTailles {}\n",
    html: "<div class=\"ex\">\n  <button matButton=\"filled\" class=\"gui-sm\"><mat-icon>add</mat-icon>Ajouter</button>\n  <button matButton=\"filled\"><mat-icon>add</mat-icon>Ajouter</button>\n  <button matButton=\"filled\" class=\"gui-lg\"><mat-icon>add</mat-icon>Ajouter</button>\n  <button matButton=\"outlined\">Suivant<mat-icon iconPositionEnd>arrow_forward</mat-icon></button>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "bouton",
    id: "bouton-desactive",
    titre: "Désactivé",
    description: "Fond et texte Action/Disabled, quel que soit le style ou la couleur.",
    composant: BoutonDesactive,
    ts: "import { Component } from '@angular/core';\nimport { MatButtonModule } from '@angular/material/button';\n\n/**\n * Désactivé\n * Fond et texte Action/Disabled, quel que soit le style ou la couleur.\n */\n@Component({\n  selector: 'ex-bouton-desactive',\n  imports: [MatButtonModule],\n  templateUrl: './bouton-desactive.html',\n  styleUrl: './bouton-desactive.css',\n})\nexport class BoutonDesactive {}\n",
    html: "<div class=\"ex\">\n  <button matButton=\"filled\" disabled>Valider</button>\n  <button matButton=\"outlined\" disabled>Annuler</button>\n  <button matButton disabled>Détails</button>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "bouton-bascule",
    id: "bouton-bascule-base",
    titre: "Groupe à choix unique",
    description: "Items Border/Input, sélection pleine en primaire avec texte On Primary, survol Neutral Subtle. Classes gui-secondary / gui-neutral sur le groupe.",
    composant: BoutonBasculeBase,
    ts: "import { Component } from '@angular/core';\nimport { MatButtonToggleModule } from '@angular/material/button-toggle';\nimport { MatIconModule } from '@angular/material/icon';\n\n/**\n * Groupe à choix unique\n * Items Border/Input, sélection pleine en primaire avec texte On Primary, survol Neutral Subtle.\n * Classes gui-secondary / gui-neutral sur le groupe.\n */\n@Component({\n  selector: 'ex-bouton-bascule-base',\n  imports: [MatButtonToggleModule, MatIconModule],\n  templateUrl: './bouton-bascule-base.html',\n  styleUrl: './bouton-bascule-base.css',\n})\nexport class BoutonBasculeBase {}\n",
    html: "<div class=\"ex\">\n  <mat-button-toggle-group aria-label=\"Période\" value=\"jour\">\n    <mat-button-toggle value=\"jour\">Jour</mat-button-toggle>\n    <mat-button-toggle value=\"semaine\">Semaine</mat-button-toggle>\n    <mat-button-toggle value=\"mois\">Mois</mat-button-toggle>\n  </mat-button-toggle-group>\n  <mat-button-toggle-group class=\"gui-neutral\" aria-label=\"Vue\" value=\"liste\">\n    <mat-button-toggle value=\"liste\" aria-label=\"Liste\"\n      ><mat-icon>view_list</mat-icon></mat-button-toggle\n    >\n    <mat-button-toggle value=\"grille\" aria-label=\"Grille\"\n      ><mat-icon>grid_view</mat-icon></mat-button-toggle\n    >\n  </mat-button-toggle-group>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "bouton-bascule",
    id: "bouton-bascule-tailles",
    titre: "Tailles et couleurs",
    description: "32 / 40 / 48 px (gui-sm, défaut, gui-lg sur le groupe).",
    composant: BoutonBasculeTailles,
    ts: "import { Component } from '@angular/core';\nimport { MatButtonToggleModule } from '@angular/material/button-toggle';\n\n/**\n * Tailles et couleurs\n * 32 / 40 / 48 px (gui-sm, défaut, gui-lg sur le groupe).\n */\n@Component({\n  selector: 'ex-bouton-bascule-tailles',\n  imports: [MatButtonToggleModule],\n  templateUrl: './bouton-bascule-tailles.html',\n  styleUrl: './bouton-bascule-tailles.css',\n})\nexport class BoutonBasculeTailles {}\n",
    html: "<div class=\"ex\">\n  <mat-button-toggle-group class=\"gui-sm gui-secondary\" aria-label=\"Small\" value=\"a\">\n    <mat-button-toggle value=\"a\">Entrée</mat-button-toggle>\n    <mat-button-toggle value=\"b\">Sortie</mat-button-toggle>\n  </mat-button-toggle-group>\n  <mat-button-toggle-group class=\"gui-neutral\" aria-label=\"Medium\" value=\"a\">\n    <mat-button-toggle value=\"a\">Entrée</mat-button-toggle>\n    <mat-button-toggle value=\"b\">Sortie</mat-button-toggle>\n  </mat-button-toggle-group>\n  <mat-button-toggle-group class=\"gui-lg\" aria-label=\"Large\" value=\"b\">\n    <mat-button-toggle value=\"a\">Entrée</mat-button-toggle>\n    <mat-button-toggle value=\"b\" disabled>Sortie</mat-button-toggle>\n  </mat-button-toggle-group>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "bouton-icone",
    id: "bouton-icone-styles",
    titre: "Styles",
    description: "Standard (sans fond), Filled (gui-filled) et Outlined (gui-outlined). Toujours un aria-label : l'icône seule ne dit rien au lecteur d'écran.",
    composant: BoutonIconeStyles,
    ts: "import { Component } from '@angular/core';\nimport { MatButtonModule } from '@angular/material/button';\nimport { MatIconModule } from '@angular/material/icon';\n\n/**\n * Styles\n * Standard (sans fond), Filled (gui-filled) et Outlined (gui-outlined). Toujours un aria-label :\n * l'icône seule ne dit rien au lecteur d'écran.\n */\n@Component({\n  selector: 'ex-bouton-icone-styles',\n  imports: [MatButtonModule, MatIconModule],\n  templateUrl: './bouton-icone-styles.html',\n  styleUrl: './bouton-icone-styles.css',\n})\nexport class BoutonIconeStyles {}\n",
    html: "<div class=\"ex\">\n  <button matIconButton aria-label=\"Modifier\"><mat-icon>edit</mat-icon></button>\n  <button matIconButton class=\"gui-filled\" aria-label=\"Ajouter\"><mat-icon>add</mat-icon></button>\n  <button matIconButton class=\"gui-outlined\" aria-label=\"Plus d'actions\">\n    <mat-icon>more_vert</mat-icon>\n  </button>\n  <button matIconButton class=\"gui-neutral\" aria-label=\"Fermer\"><mat-icon>close</mat-icon></button>\n  <button matIconButton class=\"gui-filled gui-destructive\" aria-label=\"Supprimer\">\n    <mat-icon>delete</mat-icon>\n  </button>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "bouton-icone",
    id: "bouton-icone-tailles",
    titre: "Tailles et désactivé",
    description: "32 / 40 / 48 px avec icônes 16 / 20 / 24 px (gui-sm, défaut, gui-lg).",
    composant: BoutonIconeTailles,
    ts: "import { Component } from '@angular/core';\nimport { MatButtonModule } from '@angular/material/button';\nimport { MatIconModule } from '@angular/material/icon';\n\n/**\n * Tailles et désactivé\n * 32 / 40 / 48 px avec icônes 16 / 20 / 24 px (gui-sm, défaut, gui-lg).\n */\n@Component({\n  selector: 'ex-bouton-icone-tailles',\n  imports: [MatButtonModule, MatIconModule],\n  templateUrl: './bouton-icone-tailles.html',\n  styleUrl: './bouton-icone-tailles.css',\n})\nexport class BoutonIconeTailles {}\n",
    html: "<div class=\"ex\">\n  <button matIconButton class=\"gui-filled gui-sm\" aria-label=\"Rechercher\">\n    <mat-icon>search</mat-icon>\n  </button>\n  <button matIconButton class=\"gui-filled\" aria-label=\"Rechercher\">\n    <mat-icon>search</mat-icon>\n  </button>\n  <button matIconButton class=\"gui-filled gui-lg\" aria-label=\"Rechercher\">\n    <mat-icon>search</mat-icon>\n  </button>\n  <button matIconButton class=\"gui-filled\" disabled aria-label=\"Rechercher\">\n    <mat-icon>search</mat-icon>\n  </button>\n  <button matIconButton class=\"gui-outlined\" disabled aria-label=\"Rechercher\">\n    <mat-icon>search</mat-icon>\n  </button>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "carte",
    id: "carte-base",
    titre: "Carte",
    description: "Radius/L (10 px), bord Border/Strong 1 px (l'élévation AMF se fait par la bordure, sans ombre), marges et espacement 16 px.",
    composant: CarteBase,
    ts: "import { Component } from '@angular/core';\nimport { MatCardModule } from '@angular/material/card';\nimport { MatButtonModule } from '@angular/material/button';\n\n/**\n * Carte\n * Radius/L (10 px), bord Border/Strong 1 px (l'élévation AMF se fait par la bordure, sans ombre),\n * marges et espacement 16 px.\n */\n@Component({\n  selector: 'ex-carte-base',\n  imports: [MatCardModule, MatButtonModule],\n  templateUrl: './carte-base.html',\n  styleUrl: './carte-base.css',\n})\nexport class CarteBase {}\n",
    html: "<div class=\"ex\">\n  <mat-card appearance=\"outlined\">\n    <mat-card-header>\n      <mat-card-title>Bobine 2611200143</mat-card-title>\n      <mat-card-subtitle>Entrée · soudée à 14 h 12</mat-card-subtitle>\n    </mat-card-header>\n    <mat-card-content>Acier DX51D, 0,65 × 1 250 mm, 18,4 t. Revêtement Z275.</mat-card-content>\n    <mat-card-actions>\n      <button matButton=\"outlined\" class=\"gui-sm gui-neutral\">Détails</button>\n      <button matButton=\"filled\" class=\"gui-sm\">Ouvrir</button>\n    </mat-card-actions>\n  </mat-card>\n</div>\n",
    css: ".ex {\n  max-width: 400px;\n}\n",
  },
  {
    page: "case",
    id: "case-base",
    titre: "États",
    description: "Case 18 px, Radius/XS, bord 2 px Border/Input ; cochée en primaire. Indéterminée pour un groupe partiellement coché.",
    composant: CaseBase,
    ts: "import { Component } from '@angular/core';\nimport { MatCheckboxModule } from '@angular/material/checkbox';\n\n/**\n * États\n * Case 18 px, Radius/XS, bord 2 px Border/Input ; cochée en primaire. Indéterminée pour un groupe\n * partiellement coché.\n */\n@Component({\n  selector: 'ex-case-base',\n  imports: [MatCheckboxModule],\n  templateUrl: './case-base.html',\n  styleUrl: './case-base.css',\n})\nexport class CaseBase {}\n",
    html: "<div class=\"ex\">\n  <mat-checkbox>Non cochée</mat-checkbox>\n  <mat-checkbox [checked]=\"true\">Cochée</mat-checkbox>\n  <mat-checkbox [indeterminate]=\"true\">Indéterminée</mat-checkbox>\n  <mat-checkbox disabled>Désactivée</mat-checkbox>\n  <mat-checkbox disabled [checked]=\"true\">Désactivée cochée</mat-checkbox>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "case",
    id: "case-couleurs",
    titre: "Secondaire et erreur",
    description: "Classe gui-secondary pour le bleu, gui-error pour une case à corriger (bord Border/Error, cochée en Feedback/Error/Solid).",
    composant: CaseCouleurs,
    ts: "import { Component } from '@angular/core';\nimport { MatCheckboxModule } from '@angular/material/checkbox';\n\n/**\n * Secondaire et erreur\n * Classe gui-secondary pour le bleu, gui-error pour une case à corriger (bord Border/Error, cochée en\n * Feedback/Error/Solid).\n */\n@Component({\n  selector: 'ex-case-couleurs',\n  imports: [MatCheckboxModule],\n  templateUrl: './case-couleurs.html',\n  styleUrl: './case-couleurs.css',\n})\nexport class CaseCouleurs {}\n",
    html: "<div class=\"ex\">\n  <mat-checkbox class=\"gui-secondary\" [checked]=\"true\">Secondaire</mat-checkbox>\n  <mat-checkbox class=\"gui-error\">J'ai lu la consigne</mat-checkbox>\n  <mat-checkbox class=\"gui-error\" [checked]=\"true\">Erreur cochée</mat-checkbox>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "champ",
    id: "champ-base",
    titre: "Libellé, aide et champ facultatif",
    description: "Libellé au-dessus du champ (Form Label), aide en Caption dessous. Pas d'astérisque (règle AMF du 24/09) : le formulaire annonce que tous les champs sont obligatoires sauf indication, et un champ facultatif porte le Tag « Facultatif ».",
    composant: ChampBase,
    ts: "import { Component } from '@angular/core';\nimport { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatInputModule } from '@angular/material/input';\n\n/**\n * Libellé, aide et champ facultatif\n * Libellé au-dessus du champ (Form Label), aide en Caption dessous. Pas d'astérisque (règle AMF du\n * 24/09) : le formulaire annonce que tous les champs sont obligatoires sauf indication, et un champ\n * facultatif porte le Tag « Facultatif ».\n */\n@Component({\n  selector: 'ex-champ-base',\n  imports: [MatFormFieldModule, MatInputModule],\n  templateUrl: './champ-base.html',\n  styleUrl: './champ-base.css',\n})\nexport class ChampBase {}\n",
    html: "<p class=\"gui-caption gui-secondary-text consigne\">\n  Sauf indication contraire, tous les champs sont obligatoires.\n</p>\n<div class=\"ex\">\n  <div class=\"gui-field\">\n    <label class=\"gui-field-label\" for=\"ex-bobine\">Numéro de bobine</label>\n    <mat-form-field>\n      <input matInput id=\"ex-bobine\" placeholder=\"Saisir une valeur\" required />\n      <mat-hint>Dix chiffres, sans espace</mat-hint>\n    </mat-form-field>\n  </div>\n  <div class=\"gui-field\">\n    <div class=\"gui-field-label-row\">\n      <label class=\"gui-field-label\" for=\"ex-commentaire\">Commentaire</label>\n      <span class=\"gui-tag gui-sm\">Facultatif</span>\n    </div>\n    <mat-form-field>\n      <input matInput id=\"ex-commentaire\" maxlength=\"100\" #commentaire />\n      <mat-hint align=\"end\">{{ commentaire.value.length }} / 100</mat-hint>\n    </mat-form-field>\n  </div>\n  <div class=\"gui-field\">\n    <label class=\"gui-field-label\" for=\"ex-epaisseur\">Épaisseur</label>\n    <mat-form-field>\n      <input matInput id=\"ex-epaisseur\" type=\"number\" value=\"0.65\" />\n      <span matTextSuffix>mm</span>\n    </mat-form-field>\n  </div>\n</div>\n",
    css: ".ex {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 24px;\n  align-items: start;\n}\n.consigne {\n  margin: 0 0 16px;\n}\n",
  },
  {
    page: "champ",
    id: "champ-icones",
    titre: "Icônes et tailles",
    description: "Icône de début (matPrefix) ou de fin (matSuffix) en 20 px. Champs de 32 / 40 / 48 px (gui-sm, défaut, gui-lg sur .gui-field).",
    composant: ChampIcones,
    ts: "import { Component } from '@angular/core';\nimport { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatInputModule } from '@angular/material/input';\nimport { MatIconModule } from '@angular/material/icon';\n\n/**\n * Icônes et tailles\n * Icône de début (matPrefix) ou de fin (matSuffix) en 20 px. Champs de 32 / 40 / 48 px (gui-sm,\n * défaut, gui-lg sur .gui-field).\n */\n@Component({\n  selector: 'ex-champ-icones',\n  imports: [MatFormFieldModule, MatInputModule, MatIconModule],\n  templateUrl: './champ-icones.html',\n  styleUrl: './champ-icones.css',\n})\nexport class ChampIcones {}\n",
    html: "<div class=\"ex\">\n  <div class=\"gui-field gui-sm\">\n    <label class=\"gui-field-label\" for=\"ex-r1\">Small</label>\n    <mat-form-field\n      ><mat-icon matPrefix>search</mat-icon><input matInput id=\"ex-r1\" placeholder=\"Rechercher\"\n    /></mat-form-field>\n  </div>\n  <div class=\"gui-field\">\n    <label class=\"gui-field-label\" for=\"ex-r2\">Medium</label>\n    <mat-form-field\n      ><mat-icon matPrefix>search</mat-icon><input matInput id=\"ex-r2\" placeholder=\"Rechercher\"\n    /></mat-form-field>\n  </div>\n  <div class=\"gui-field gui-lg\">\n    <label class=\"gui-field-label\" for=\"ex-r3\">Large</label>\n    <mat-form-field\n      ><input matInput id=\"ex-r3\" placeholder=\"Date\" /><mat-icon matSuffix\n        >event</mat-icon\n      ></mat-form-field\n    >\n  </div>\n</div>\n",
    css: ".ex {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 24px;\n  align-items: start;\n}\n",
  },
  {
    page: "champ",
    id: "champ-etats",
    titre: "Erreur, désactivé, lecture seule",
    description: "Erreur : bordure Border/Error 2 px et message Feedback/Error. Désactivé : Background/Disabled. Lecture seule : classe gui-readonly (Surface Subtle, Border/Default).",
    composant: ChampEtats,
    ts: "import { Component } from '@angular/core';\nimport { FormControl, Validators } from '@angular/forms';\nimport { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatInputModule } from '@angular/material/input';\nimport { ReactiveFormsModule } from '@angular/forms';\n\n/**\n * Erreur, désactivé, lecture seule\n * Erreur : bordure Border/Error 2 px et message Feedback/Error. Désactivé : Background/Disabled.\n * Lecture seule : classe gui-readonly (Surface Subtle, Border/Default).\n */\n@Component({\n  selector: 'ex-champ-etats',\n  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],\n  templateUrl: './champ-etats.html',\n  styleUrl: './champ-etats.css',\n})\nexport class ChampEtats {\n  protected readonly poids = new FormControl('', Validators.required);\n\n  constructor() {\n    this.poids.markAsTouched();\n  }\n}\n",
    html: "<div class=\"ex\">\n  <div class=\"gui-field\">\n    <label class=\"gui-field-label\" for=\"ex-poids\">Poids</label>\n    <mat-form-field>\n      <input matInput id=\"ex-poids\" [formControl]=\"poids\" />\n      <span matTextSuffix>kg</span>\n      <mat-error>Le poids est obligatoire</mat-error>\n    </mat-form-field>\n  </div>\n  <div class=\"gui-field\">\n    <label class=\"gui-field-label\" for=\"ex-ligne\">Ligne</label>\n    <mat-form-field><input matInput id=\"ex-ligne\" value=\"Galma 2\" disabled /></mat-form-field>\n  </div>\n  <div class=\"gui-field\">\n    <label class=\"gui-field-label\" for=\"ex-of\">Ordre de fabrication</label>\n    <mat-form-field class=\"gui-readonly\"\n      ><input matInput id=\"ex-of\" value=\"OF-2026-1142\" readonly\n    /></mat-form-field>\n  </div>\n</div>\n",
    css: ".ex {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 24px;\n  align-items: start;\n}\n",
  },
  {
    page: "compteur",
    id: "compteur-base",
    titre: "Pastilles",
    description: "Count : nombre dans une pastille 16 / 20 / 24 px. Dot : point 8 / 10 / 12 px. Brand (défaut), Navy (gui-navy) ou Grey (gui-grey). Le sens passe par un texte masqué (gui-sr-only) ou, pour un point, role=\"img\" et aria-label.",
    composant: CompteurBase,
    ts: "import { Component } from '@angular/core';\n\n/**\n * Pastilles\n * Count : nombre dans une pastille 16 / 20 / 24 px. Dot : point 8 / 10 / 12 px. Brand (défaut), Navy\n * (gui-navy) ou Grey (gui-grey). Le sens passe par un texte masqué (gui-sr-only) ou, pour un point,\n * role=\"img\" et aria-label.\n */\n@Component({\n  selector: 'ex-compteur-base',\n  imports: [],\n  templateUrl: './compteur-base.html',\n  styleUrl: './compteur-base.css',\n})\nexport class CompteurBase {}\n",
    html: "<div class=\"ex\">\n  <span class=\"gui-count gui-sm\">3<span class=\"gui-sr-only\"> notifications</span></span>\n  <span class=\"gui-count\">12<span class=\"gui-sr-only\"> notifications</span></span>\n  <span class=\"gui-count gui-lg\">128<span class=\"gui-sr-only\"> notifications</span></span>\n  <span class=\"gui-count gui-navy\">2<span class=\"gui-sr-only\"> repères</span></span>\n  <span class=\"gui-count gui-grey\">4<span class=\"gui-sr-only\"> éléments</span></span>\n  <span class=\"gui-count gui-dot\" role=\"img\" aria-label=\"Nouveau\"></span>\n  <span class=\"gui-count gui-dot gui-grey\" role=\"img\" aria-label=\"Lu\"></span>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "interrupteur",
    id: "interrupteur-base",
    titre: "États",
    description: "Piste 44 × 24 bord 2 px, curseur 16 px éteint, 20 px allumé. Libellé Body 2 à 8 px.",
    composant: InterrupteurBase,
    ts: "import { Component } from '@angular/core';\nimport { MatSlideToggleModule } from '@angular/material/slide-toggle';\n\n/**\n * États\n * Piste 44 × 24 bord 2 px, curseur 16 px éteint, 20 px allumé. Libellé Body 2 à 8 px.\n */\n@Component({\n  selector: 'ex-interrupteur-base',\n  imports: [MatSlideToggleModule],\n  templateUrl: './interrupteur-base.html',\n  styleUrl: './interrupteur-base.css',\n})\nexport class InterrupteurBase {}\n",
    html: "<div class=\"ex\">\n  <mat-slide-toggle>Éteint</mat-slide-toggle>\n  <mat-slide-toggle [checked]=\"true\">Allumé</mat-slide-toggle>\n  <mat-slide-toggle class=\"gui-secondary\" [checked]=\"true\">Secondaire</mat-slide-toggle>\n  <mat-slide-toggle disabled>Désactivé</mat-slide-toggle>\n  <mat-slide-toggle disabled [checked]=\"true\">Désactivé allumé</mat-slide-toggle>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "onglets",
    id: "onglets-base",
    titre: "Onglets",
    description: "Hauteur 48 px, libellé BUTTON 2 en capitales. Actif : Foreground/Brand et indicateur primaire 2 px. Survol : Neutral Subtle.",
    composant: OngletsBase,
    ts: "import { Component } from '@angular/core';\nimport { MatTabsModule } from '@angular/material/tabs';\n\n/**\n * Onglets\n * Hauteur 48 px, libellé BUTTON 2 en capitales. Actif : Foreground/Brand et indicateur primaire 2 px.\n * Survol : Neutral Subtle.\n */\n@Component({\n  selector: 'ex-onglets-base',\n  imports: [MatTabsModule],\n  templateUrl: './onglets-base.html',\n  styleUrl: './onglets-base.css',\n})\nexport class OngletsBase {}\n",
    html: "<mat-tab-group>\n  <mat-tab label=\"Bobine\">Contenu de l'onglet Bobine.</mat-tab>\n  <mat-tab label=\"Défauts\">Contenu de l'onglet Défauts.</mat-tab>\n  <mat-tab label=\"Historique\">Contenu de l'onglet Historique.</mat-tab>\n  <mat-tab label=\"Archives\" disabled>Indisponible.</mat-tab>\n</mat-tab-group>\n",
    css: "mat-tab-group {\n  max-width: 640px;\n}\n\n::ng-deep .mat-mdc-tab-body-content {\n  padding: 16px 0;\n}\n",
  },
  {
    page: "radio",
    id: "radio-base",
    titre: "Groupe",
    description: "Cercle 20 px, point 10 px. Le groupe porte un aria-label (ou un aria-labelledby vers son titre).",
    composant: RadioBase,
    ts: "import { Component } from '@angular/core';\nimport { MatRadioModule } from '@angular/material/radio';\n\n/**\n * Groupe\n * Cercle 20 px, point 10 px. Le groupe porte un aria-label (ou un aria-labelledby vers son titre).\n */\n@Component({\n  selector: 'ex-radio-base',\n  imports: [MatRadioModule],\n  templateUrl: './radio-base.html',\n  styleUrl: './radio-base.css',\n})\nexport class RadioBase {}\n",
    html: "<mat-radio-group class=\"ex\" aria-label=\"Sens de bobinage\" value=\"haut\">\n  <mat-radio-button value=\"haut\">Par le haut</mat-radio-button>\n  <mat-radio-button value=\"bas\">Par le bas</mat-radio-button>\n  <mat-radio-button value=\"aucun\" disabled>Indifférent</mat-radio-button>\n</mat-radio-group>\n<mat-radio-group class=\"ex gui-secondary\" aria-label=\"Couleur secondaire\" value=\"b\">\n  <mat-radio-button class=\"gui-secondary\" value=\"a\">Secondaire</mat-radio-button>\n  <mat-radio-button class=\"gui-secondary\" value=\"b\">Secondaire sélectionné</mat-radio-button>\n</mat-radio-group>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n.ex + .ex {\n  margin-top: 8px;\n}\n",
  },
  {
    page: "separateur",
    id: "separateur-base",
    titre: "Séparateurs",
    description: "Ligne 1 px Border/Default ; gui-subtle pour Border/Subtle ; gui-inset pour le retrait de 16 px ; vertical entre deux éléments d'une barre.",
    composant: SeparateurBase,
    ts: "import { Component } from '@angular/core';\nimport { MatDividerModule } from '@angular/material/divider';\n\n/**\n * Séparateurs\n * Ligne 1 px Border/Default ; gui-subtle pour Border/Subtle ; gui-inset pour le retrait de 16 px ;\n * vertical entre deux éléments d'une barre.\n */\n@Component({\n  selector: 'ex-separateur-base',\n  imports: [MatDividerModule],\n  templateUrl: './separateur-base.html',\n  styleUrl: './separateur-base.css',\n})\nexport class SeparateurBase {}\n",
    html: "<div class=\"ex\">\n  <span>Avant</span>\n  <mat-divider />\n  <span>Après</span>\n  <mat-divider class=\"gui-subtle\" />\n  <span>Avec retrait (gui-inset)</span>\n  <mat-divider class=\"gui-inset\" />\n  <div class=\"barre\">\n    <span>Entrée</span>\n    <mat-divider vertical />\n    <span>Centre</span>\n    <mat-divider vertical />\n    <span>Sortie</span>\n  </div>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 8px;\n}\n\n.barre {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  height: 24px;\n}\n",
  },
  {
    page: "statut",
    id: "statut-base",
    titre: "Statuts",
    description: "Point Feedback/<Type>/Solid de 10 px et libellé Body 2 (Small : point 8 px, Caption). Le libellé porte le sens, la couleur seule ne suffit pas.",
    composant: StatutBase,
    ts: "import { Component } from '@angular/core';\n\n/**\n * Statuts\n * Point Feedback/<Type>/Solid de 10 px et libellé Body 2 (Small : point 8 px, Caption). Le libellé\n * porte le sens, la couleur seule ne suffit pas.\n */\n@Component({\n  selector: 'ex-statut-base',\n  imports: [],\n  templateUrl: './statut-base.html',\n  styleUrl: './statut-base.css',\n})\nexport class StatutBase {}\n",
    html: "<div class=\"ex\">\n  <span class=\"gui-status gui-success\">Conforme</span>\n  <span class=\"gui-status gui-warning\">À surveiller</span>\n  <span class=\"gui-status gui-error\">Bloqué</span>\n  <span class=\"gui-status gui-info\">En attente</span>\n  <span class=\"gui-status\">Inactif</span>\n  <span class=\"gui-status gui-success gui-sm\">Small</span>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n",
  },
  {
    page: "tag",
    id: "tag-base",
    titre: "Couleurs",
    description: "Radius/S, fond Accent/<Couleur>/Subtle et texte On Subtle ; Brand en primaire. Inversé : fond Strong, texte On Strong. Le tag classe, le badge signale un état.",
    composant: TagBase,
    ts: "import { Component } from '@angular/core';\nimport { MatIconModule } from '@angular/material/icon';\n\n/**\n * Couleurs\n * Radius/S, fond Accent/<Couleur>/Subtle et texte On Subtle ; Brand en primaire. Inversé : fond\n * Strong, texte On Strong. Le tag classe, le badge signale un état.\n */\n@Component({\n  selector: 'ex-tag-base',\n  imports: [MatIconModule],\n  templateUrl: './tag-base.html',\n  styleUrl: './tag-base.css',\n})\nexport class TagBase {}\n",
    html: "<div class=\"ex\">\n  <span class=\"gui-tag gui-brand\">Brand</span>\n  <span class=\"gui-tag gui-orange\">Orange</span>\n  <span class=\"gui-tag gui-blue\">Bleu</span>\n  <span class=\"gui-tag gui-green\">Vert</span>\n  <span class=\"gui-tag gui-navy\">Marine</span>\n  <span class=\"gui-tag gui-purple\">Violet</span>\n  <span class=\"gui-tag\">Gris</span>\n</div>\n<div class=\"ex\">\n  <span class=\"gui-tag gui-brand gui-inverted\">Brand</span>\n  <span class=\"gui-tag gui-orange gui-inverted\">Orange</span>\n  <span class=\"gui-tag gui-blue gui-inverted\">Bleu</span>\n  <span class=\"gui-tag gui-green gui-inverted\">Vert</span>\n  <span class=\"gui-tag gui-navy gui-inverted\">Marine</span>\n  <span class=\"gui-tag gui-purple gui-inverted\">Violet</span>\n  <span class=\"gui-tag gui-inverted\">Gris</span>\n</div>\n<div class=\"ex\">\n  <span class=\"gui-tag gui-blue gui-sm\">Small</span>\n  <span class=\"gui-tag gui-blue\"><mat-icon aria-hidden=\"true\">label</mat-icon>Avec icône</span>\n  <span class=\"gui-tag gui-disabled\" aria-disabled=\"true\">Désactivé</span>\n</div>\n",
    css: ".ex {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}\n.ex + .ex {\n  margin-top: 12px;\n}\n",
  },
];
