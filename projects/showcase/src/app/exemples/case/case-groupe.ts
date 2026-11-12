import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

/**
 * Checkbox Group
 * Groupe de cases (journal du 29/09) : <fieldset class="gui-group"> avec une légende qui pose la
 * question, items espacés de 4 px (ou 24 px en ligne avec gui-horizontal), aide ou erreur en Caption
 * sous le groupe. En erreur (gui-error), chaque case passe en Border/Error.
 */
@Component({
  selector: 'ex-case-groupe',
  imports: [MatCheckboxModule],
  templateUrl: './case-groupe.html',
  styleUrl: './case-groupe.css',
})
export class CaseGroupe {}
