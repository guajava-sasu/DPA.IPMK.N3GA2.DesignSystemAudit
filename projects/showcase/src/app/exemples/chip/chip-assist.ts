import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

/**
 * Assist
 * mat-chip : action ponctuelle ou raccourci (raccourcis du Date Picker, « Afficher tout (n) » d'un
 * groupe replié). Pilule Radius/Full, bord Border/Input, icône 16 px facultative.
 */
@Component({
  selector: 'ex-chip-assist',
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './chip-assist.html',
  styleUrl: './chip-assist.css',
})
export class ChipAssist {}
