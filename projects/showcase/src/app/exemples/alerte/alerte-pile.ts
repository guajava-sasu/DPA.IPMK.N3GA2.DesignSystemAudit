import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Alert Stack
 * Pile fixe (gui-alert-stack) en bas à droite à 24 px (gui-top pour le haut), écart 8, trois alertes
 * au plus : la plus ancienne sort quand une quatrième arrive. La pile est une région aria-live polite
 * ; une erreur porte role="alert" pour être annoncée tout de suite.
 */
@Component({
  selector: 'ex-alerte-pile',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './alerte-pile.html',
  styleUrl: './alerte-pile.css',
})
export class AlertePile {
  private n = 0;
  protected readonly pile = signal<{ id: number; classe: string; texte: string }[]>([]);

  protected ajouter(classe: string): void {
    const id = ++this.n;
    const texte =
      classe === 'gui-error' ? `Envoi ${id} refusé par OG.` : `Bobine ${2611200 + id} enregistrée.`;
    this.pile.update((p) => [...p, { id, classe, texte }].slice(-3));
  }

  protected fermer(id: number): void {
    this.pile.update((p) => p.filter((a) => a.id !== id));
  }
}
