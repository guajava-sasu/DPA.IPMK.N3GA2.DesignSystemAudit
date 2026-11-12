import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

/**
 * Groupe à choix unique
 * Items Border/Input, sélection pleine en primaire avec texte On Primary, survol Neutral Subtle.
 * Classes gui-secondary / gui-neutral sur le groupe.
 */
@Component({
  selector: 'ex-bouton-bascule-base',
  imports: [MatButtonToggleModule, MatIconModule],
  templateUrl: './bouton-bascule-base.html',
  styleUrl: './bouton-bascule-base.css',
})
export class BoutonBasculeBase {}
