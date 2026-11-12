import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

/**
 * Choix multiple
 * Attribut multiple : chaque option porte une case (Select Option Type=Multiple, case Secondary), le
 * panneau reste ouvert pendant le choix.
 */
@Component({
  selector: 'ex-select-multiple',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './select-multiple.html',
  styleUrl: './select-multiple.css',
})
export class SelectMultiple {}
