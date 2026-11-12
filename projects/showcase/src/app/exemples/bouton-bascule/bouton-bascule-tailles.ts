import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

/**
 * Tailles et couleurs
 * 32 / 40 / 48 px (gui-sm, défaut, gui-lg sur le groupe).
 */
@Component({
  selector: 'ex-bouton-bascule-tailles',
  imports: [MatButtonToggleModule],
  templateUrl: './bouton-bascule-tailles.html',
  styleUrl: './bouton-bascule-tailles.css',
})
export class BoutonBasculeTailles {}
