import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Tailles et icônes
 * Small 32 px (gui-sm), Medium 40 px (défaut), Large 48 px (gui-lg). Icône de tête ou de fin
 * (iconPositionEnd), 16 / 20 / 24 px selon la taille.
 */
@Component({
  selector: 'ex-bouton-tailles',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './bouton-tailles.html',
  styleUrl: './bouton-tailles.css',
})
export class BoutonTailles {}
