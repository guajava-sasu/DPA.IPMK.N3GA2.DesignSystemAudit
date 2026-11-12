import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent } from '@angular/material/chips';

/**
 * Input
 * mat-chip-row dans une mat-chip-grid, champ de saisie après la grille (matChipInputFor) : valeurs
 * saisies, retirables par la croix ou la touche Retour arrière. Valider la saisie par Entrée ou
 * virgule.
 */
@Component({
  selector: 'ex-chip-saisie',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './chip-saisie.html',
  styleUrl: './chip-saisie.css',
})
export class ChipSaisie {
  protected readonly bobines = signal(['B260114', 'B260117']);

  protected ajouter(e: MatChipInputEvent): void {
    const v = (e.value ?? '').trim();
    if (v && !this.bobines().includes(v)) this.bobines.update((l) => [...l, v]);
    e.chipInput.clear();
  }

  protected retirer(b: string): void {
    this.bobines.update((l) => l.filter((x) => x !== b));
  }
}
