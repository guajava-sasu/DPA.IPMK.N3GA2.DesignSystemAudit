import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

/**
 * Single
 * Bouton qui ouvre un Menu : chevron Arrow Drop Down à droite, Arrow Drop Up et couleur Pressed quand
 * le menu est ouvert (journal du 14/09). Filled ou Outlined, Primary, Secondary ou Neutral (journal du
 * 22/09), trois tailles.
 */
@Component({
  selector: 'ex-bouton-menu-simple',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './bouton-menu-simple.html',
  styleUrl: './bouton-menu-simple.css',
})
export class BoutonMenuSimple {}
