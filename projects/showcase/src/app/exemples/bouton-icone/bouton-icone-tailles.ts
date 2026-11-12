import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Tailles et désactivé
 * 32 / 40 / 48 px avec icônes 16 / 20 / 24 px (gui-sm, défaut, gui-lg).
 */
@Component({
  selector: 'ex-bouton-icone-tailles',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './bouton-icone-tailles.html',
  styleUrl: './bouton-icone-tailles.css',
})
export class BoutonIconeTailles {}
