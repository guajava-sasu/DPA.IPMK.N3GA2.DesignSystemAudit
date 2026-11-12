import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

/**
 * Valeur unique
 * mat-slider : piste 4 px, curseur 20 px bordé de blanc, étiquette de valeur (discrete) sur fond
 * Background/Inverse pendant le glissement. Primary par défaut, gui-secondary en bleu.
 */
@Component({
  selector: 'ex-curseur-simple',
  imports: [MatSliderModule],
  templateUrl: './curseur-simple.html',
  styleUrl: './curseur-simple.css',
})
export class CurseurSimple {}
