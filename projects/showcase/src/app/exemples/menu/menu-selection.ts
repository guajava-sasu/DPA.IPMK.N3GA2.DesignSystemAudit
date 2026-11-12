import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

/**
 * Menu de réglages en cascade
 * Exemple de conception du Figma (journal du 29/09) : sous-menu aligné sur l'item parent, choix
 * courant marqué Selected (libellé Form Label et coche à droite, classe gui-selected ; la coche est un
 * span.material-icons, un mat-icon serait placé en tête de l'item par Material), sous-en-tête en
 * Caption Medium.
 */
@Component({
  selector: 'ex-menu-selection',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './menu-selection.html',
  styleUrl: './menu-selection.css',
})
export class MenuSelection {
  protected readonly densites = ['Confortable', 'Standard', 'Compacte'];
  protected readonly densiteChoisie = signal('Standard');
}
