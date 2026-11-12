import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Section dépliée et repliée
 * Carte de page : pastille en dégradé (décorative, aria-hidden), titre Subtitle Medium, description,
 * actions et bouton Replier / Déplier (Text Neutral Small, aria-expanded et aria-controls). Repliée,
 * la section ne garde que son en-tête.
 */
@Component({
  selector: 'ex-section-repliable',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './section-repliable.html',
  styleUrl: './section-repliable.css',
})
export class SectionRepliable {
  protected readonly sections = [
    {
      id: 'a',
      icone: 'factory',
      titre: 'Campagne en cours',
      description: 'DX51D+Z, 62 bobines mères',
    },
    {
      id: 'b',
      icone: 'inventory_2',
      titre: 'Stock de la halle',
      description: 'Mis à jour à 20 h 45',
    },
  ];
  protected readonly ouvertes = signal(['a']);

  protected basculer(id: string): void {
    this.ouvertes.update((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  }
}
