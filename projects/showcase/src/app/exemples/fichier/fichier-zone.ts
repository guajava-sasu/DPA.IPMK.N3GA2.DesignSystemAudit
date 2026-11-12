import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Zone de dépôt
 * CSS pur (classe gui-file-upload) : Material n'a pas d'équivalent. Le bouton Parcourir (Outlined
 * Neutral Small) ouvre le sélecteur de fichiers ; la zone accepte aussi le glisser-déposer (gui-
 * dragover pendant le survol). États gui-error et gui-disabled (avec aria-disabled="true").
 */
@Component({
  selector: 'ex-fichier-zone',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './fichier-zone.html',
  styleUrl: './fichier-zone.css',
})
export class FichierZone {
  protected readonly survol = signal(false);
  protected readonly nom = signal('');

  protected deposer(e: DragEvent): void {
    e.preventDefault();
    this.survol.set(false);
    this.nom.set(e.dataTransfer?.files[0]?.name ?? '');
  }

  protected choisir(input: HTMLInputElement): void {
    this.nom.set(input.files?.[0]?.name ?? '');
  }
}
