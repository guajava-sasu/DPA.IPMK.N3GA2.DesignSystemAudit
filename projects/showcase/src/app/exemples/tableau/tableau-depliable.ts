import { Component, computed, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';

interface Ligne {
  code: string;
  nuance: string;
  poids: number;
  parent?: string;
}

const COULEES: (Ligne & { bobines: Ligne[] })[] = [
  {
    code: 'C-7781',
    nuance: 'DX51D+Z',
    poids: 54.6,
    bobines: [
      { code: 'B24-0412', nuance: 'DX51D+Z', poids: 18.4 },
      { code: 'B24-0415', nuance: 'DX51D+Z', poids: 15.2 },
      { code: 'B24-0418', nuance: 'DX51D+Z', poids: 21 },
    ],
  },
  {
    code: 'C-7782',
    nuance: 'S350GD+Z',
    poids: 48.4,
    bobines: [
      { code: 'B24-0414', nuance: 'S350GD+Z', poids: 24.9 },
      { code: 'B24-0420', nuance: 'S350GD+Z', poids: 23.5 },
    ],
  },
  {
    code: 'C-7783',
    nuance: 'DX54D+Z',
    poids: 17.8,
    bobines: [{ code: 'B24-0416', nuance: 'DX54D+Z', poids: 17.8 }],
  },
];

/**
 * Lignes dépliables (Expand et Nested)
 * Cellules Type=Expand et Type=Nested (journal du 05/10) : bouton de bascule 32 px dans une colonne de
 * 56, lignes filles en retrait de 32 avec la flèche subdirectory_arrow_right 16 px et le libellé en
 * Foreground/Secondary, sur Background/Surface Subtle. La liste à plat (parents puis enfants dépliés)
 * est calculée par le composant.
 */
@Component({
  selector: 'ex-tableau-depliable',
  imports: [DecimalPipe, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './tableau-depliable.html',
  styleUrl: './tableau-depliable.css',
})
export class TableauDepliable {
  protected readonly colonnes = ['bascule', 'code', 'nuance', 'poids'];
  protected readonly ouvertes = signal(new Set(['C-7781']));
  protected readonly lignes = computed<Ligne[]>(() =>
    COULEES.flatMap(({ bobines, ...c }) =>
      this.ouvertes().has(c.code) ? [c, ...bobines.map((b) => ({ ...b, parent: c.code }))] : [c],
    ),
  );

  protected basculer(code: string): void {
    this.ouvertes.update((s) => {
      const suite = new Set(s);
      if (!suite.delete(code)) {
        suite.add(code);
      }
      return suite;
    });
  }
}
