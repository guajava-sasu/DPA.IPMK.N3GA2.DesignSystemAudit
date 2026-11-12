import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

/**
 * États
 * Case 18 px, Radius/XS, bord 2 px Border/Input ; cochée en primaire. Indéterminée pour un groupe
 * partiellement coché.
 */
@Component({
  selector: 'ex-case-base',
  imports: [MatCheckboxModule],
  templateUrl: './case-base.html',
  styleUrl: './case-base.css',
})
export class CaseBase {}
