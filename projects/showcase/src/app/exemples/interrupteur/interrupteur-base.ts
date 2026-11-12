import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/**
 * États
 * Piste 44 × 24 bord 2 px, curseur 16 px éteint, 20 px allumé. Libellé Body 2 à 8 px.
 */
@Component({
  selector: 'ex-interrupteur-base',
  imports: [MatSlideToggleModule],
  templateUrl: './interrupteur-base.html',
  styleUrl: './interrupteur-base.css',
})
export class InterrupteurBase {}
