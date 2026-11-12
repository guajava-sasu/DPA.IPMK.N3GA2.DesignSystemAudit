import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

/**
 * Choix unique
 * mat-select dans un Form Field : panneau 4 px sous le champ, Border/Strong, Radius/M, ombre Lv2 ;
 * options de 40 px, choisie en Secondary Tint avec coche à droite.
 */
@Component({
  selector: 'ex-select-simple',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './select-simple.html',
  styleUrl: './select-simple.css',
})
export class SelectSimple {}
