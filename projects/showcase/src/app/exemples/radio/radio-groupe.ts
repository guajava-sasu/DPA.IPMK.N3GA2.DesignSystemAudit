import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';

/**
 * Radio Group
 * Groupe de radios (journal du 29/09) : même structure que le Checkbox Group ; le mat-radio-group
 * porte la classe gui-group-items et le nom accessible de la légende (aria-labelledby).
 */
@Component({
  selector: 'ex-radio-groupe',
  imports: [MatRadioModule],
  templateUrl: './radio-groupe.html',
  styleUrl: './radio-groupe.css',
})
export class RadioGroupe {}
