import { Component, computed, signal } from '@angular/core';

/**
 * Pagination
 * Pagination (custom) Size=Medium, Color=Primary : boutons de 40 px, page courante pleine en Primary
 * (aria-current="page"), ellipse au-delà de 7 pages, flèches précédente et suivante désactivées aux
 * extrémités. Le calcul des pages affichées reste au composant de l'application.
 */
@Component({
  selector: 'ex-pagination-simple',
  imports: [],
  templateUrl: './pagination-simple.html',
  styleUrl: './pagination-simple.css',
})
export class PaginationSimple {
  protected readonly total = 12;
  protected readonly page = signal(1);
  /** Pages affichées : 0 pour une ellipse. Toujours 7 positions : 1, 2, 3, 4, 5, …, 12 ou 1, …, 5, 6, 7, …, 12. */
  protected readonly pages = computed(() => {
    const p = this.page();
    const n = this.total;
    if (p <= 4) return [1, 2, 3, 4, 5, 0, n];
    if (p >= n - 3) return [1, 0, n - 4, n - 3, n - 2, n - 1, n];
    return [1, 0, p - 1, p, p + 1, 0, n];
  });

  protected aller(p: number): void {
    this.page.set(Math.min(Math.max(p, 1), this.total));
  }
}
