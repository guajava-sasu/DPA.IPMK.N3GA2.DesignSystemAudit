import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/**
 * Désactivé
 * Fond et texte Action/Disabled, quel que soit le style ou la couleur.
 */
@Component({
  selector: 'ex-bouton-desactive',
  imports: [MatButtonModule],
  templateUrl: './bouton-desactive.html',
  styleUrl: './bouton-desactive.css',
})
export class BoutonDesactive {}
