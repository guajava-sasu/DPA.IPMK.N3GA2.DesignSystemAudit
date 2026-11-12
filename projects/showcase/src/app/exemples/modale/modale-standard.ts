import { Component, TemplateRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

/**
 * Standard, tailles S / M / L
 * MatDialog ouvert avec panelClass gui-modale-sm (400), gui-modale-md (560) ou gui-modale-lg (800).
 * Titre Heading H6, contenu Body 2 secondaire, actions séparées par Border/Subtle : Secondary en Text
 * Neutral, Primary en Filled. Voile Background/Overlay ; le focus revient au bouton d'origine à la
 * fermeture.
 */
@Component({
  selector: 'ex-modale-standard',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './modale-standard.html',
  styleUrl: './modale-standard.css',
})
export class ModaleStandard {
  private readonly dialog = inject(MatDialog);

  protected ouvrir(modele: TemplateRef<unknown>, taille: 'sm' | 'md' | 'lg'): void {
    this.dialog.open(modele, { panelClass: ['gui-modale-' + taille] });
  }
}
