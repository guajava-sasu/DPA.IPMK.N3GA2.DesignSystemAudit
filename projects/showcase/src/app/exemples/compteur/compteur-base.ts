import { Component } from '@angular/core';

/**
 * Pastilles
 * Count : nombre dans une pastille 16 / 20 / 24 px. Dot : point 8 / 10 / 12 px. Brand (défaut), Navy
 * (gui-navy) ou Grey (gui-grey). Le sens passe par un texte masqué (gui-sr-only) ou, pour un point,
 * role="img" et aria-label.
 */
@Component({
  selector: 'ex-compteur-base',
  imports: [],
  templateUrl: './compteur-base.html',
  styleUrl: './compteur-base.css',
})
export class CompteurBase {}
