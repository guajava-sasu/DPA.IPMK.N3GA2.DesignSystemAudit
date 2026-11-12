import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Filter
 * mat-chip-option dans une mat-chip-listbox : filtre activable ; sélectionné en Primary plein avec
 * coche (journal du 15/09), les autres restent neutres.
 */
@Component({
  selector: 'ex-chip-filtre',
  imports: [MatChipsModule],
  templateUrl: './chip-filtre.html',
  styleUrl: './chip-filtre.css',
})
export class ChipFiltre {}
