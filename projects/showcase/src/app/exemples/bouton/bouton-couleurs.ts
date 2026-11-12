import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/**
 * Couleurs
 * Classes gui-secondary (bleu), gui-neutral (gris) et gui-destructive (rouge, suppression). Sans
 * classe : primaire.
 */
@Component({
  selector: 'ex-bouton-couleurs',
  imports: [MatButtonModule],
  templateUrl: './bouton-couleurs.html',
  styleUrl: './bouton-couleurs.css',
})
export class BoutonCouleurs {}
