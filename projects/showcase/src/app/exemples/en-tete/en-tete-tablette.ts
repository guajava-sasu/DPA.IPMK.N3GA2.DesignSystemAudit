import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Tablet (gui-tablet, 56 px)
 * Hauteur 56, CTA en taille Small, nom et rôle masqués : seul l'avatar et le menu du compte restent.
 */
@Component({
  selector: 'ex-en-tete-tablette',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './en-tete-tablette.html',
  styleUrl: './en-tete-tablette.css',
})
export class EnTeteTablette {}
