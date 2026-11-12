import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/**
 * Progress Bar
 * Barre de 4 px, Radius/XS, piste Border/Subtle, indicateur Primary ou Secondary (gui-secondary).
 * Buffer : piste Border/Default, tampon Border/Subtle. Le mode indéterminé est figé sur les postes RDS
 * (animations désactivées) : préférer une valeur et un libellé.
 */
@Component({
  selector: 'ex-chargement-barre',
  imports: [MatProgressBarModule],
  templateUrl: './chargement-barre.html',
  styleUrl: './chargement-barre.css',
})
export class ChargementBarre {}
