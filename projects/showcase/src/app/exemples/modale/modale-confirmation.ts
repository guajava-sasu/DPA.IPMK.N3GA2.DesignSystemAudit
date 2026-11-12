import { Component, TemplateRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

/**
 * Confirmation et Destructive
 * En-tête gui-modale-header avec icône 24 (Confirmation : info en Feedback/Info/Foreground ;
 * Destructive : warning en Feedback/Error/Foreground, classe gui-error) et bouton Fermer de 40
 * facultatif. L'action destructive est Filled Destructive ; le focus initial va sur Annuler
 * (cdkFocusInitial).
 */
@Component({
  selector: 'ex-modale-confirmation',
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './modale-confirmation.html',
  styleUrl: './modale-confirmation.css',
})
export class ModaleConfirmation {
  private readonly dialog = inject(MatDialog);

  protected ouvrir(modele: TemplateRef<unknown>, taille: 'sm' | 'md' | 'lg'): void {
    this.dialog.open(modele, { panelClass: ['gui-modale-' + taille] });
  }
}
