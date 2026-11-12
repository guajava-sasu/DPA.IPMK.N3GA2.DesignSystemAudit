import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';

/**
 * Groupe
 * Cercle 20 px, point 10 px. Le groupe porte un aria-label (ou un aria-labelledby vers son titre).
 */
@Component({
  selector: 'ex-radio-base',
  imports: [MatRadioModule],
  templateUrl: './radio-base.html',
  styleUrl: './radio-base.css',
})
export class RadioBase {}
