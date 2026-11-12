import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Styles
 * Standard (sans fond), Filled (gui-filled) et Outlined (gui-outlined). Toujours un aria-label :
 * l'icône seule ne dit rien au lecteur d'écran.
 */
@Component({
  selector: 'ex-bouton-icone-styles',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './bouton-icone-styles.html',
  styleUrl: './bouton-icone-styles.css',
})
export class BoutonIconeStyles {}
