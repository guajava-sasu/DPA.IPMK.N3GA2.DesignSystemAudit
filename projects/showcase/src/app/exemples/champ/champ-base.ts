import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Libellé, aide et champ facultatif
 * Libellé au-dessus du champ (Form Label), aide en Caption dessous. Pas d'astérisque (règle AMF du
 * 24/09) : le formulaire annonce que tous les champs sont obligatoires sauf indication, et un champ
 * facultatif porte le Tag « Facultatif ».
 */
@Component({
  selector: 'ex-champ-base',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './champ-base.html',
  styleUrl: './champ-base.css',
})
export class ChampBase {}
