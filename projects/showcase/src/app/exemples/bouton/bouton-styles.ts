import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/**
 * Styles
 * Filled pour l'action principale de l'écran, Outlined pour une action secondaire, Text pour une
 * action discrète. Couleur primaire (cuivre) par défaut.
 */
@Component({
  selector: 'ex-bouton-styles',
  imports: [MatButtonModule],
  templateUrl: './bouton-styles.html',
  styleUrl: './bouton-styles.css',
})
export class BoutonStyles {}
