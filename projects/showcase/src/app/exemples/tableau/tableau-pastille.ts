import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DecimalPipe } from '@angular/common';

/**
 * En-tête avec pastille (hasIcon)
 * Table hasIcon (journal du 05/10), pour les tableaux de tête de page : pastille décorative en quart
 * de cercle de 56 px collée au coin (span gui-table-badge, aria-hidden), icône blanche 24 px. Son
 * dégradé est hors jetons, relevé tel quel dans le Figma (version simplifiée du style Gradient de
 * l'ancien thème AMF).
 */
@Component({
  selector: 'ex-tableau-pastille',
  imports: [DecimalPipe, MatTableModule, MatButtonModule],
  templateUrl: './tableau-pastille.html',
  styleUrl: './tableau-pastille.css',
})
export class TableauPastille {
  protected readonly colonnes = ['nuance', 'bobines', 'poids'];
  protected readonly stock = [
    { nuance: 'DX51D+Z', bobines: 14, poids: 251.3 },
    { nuance: 'S350GD+Z', bobines: 6, poids: 142.8 },
    { nuance: 'DX54D+Z', bobines: 3, poids: 53.4 },
  ];
}
