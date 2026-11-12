import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Liste d'inspection
 * Chaque contrôle porte son résultat dans un Toggle Button Neutral (Conforme / Non conforme) : la
 * sémantique est donnée par le libellé et par le bandeau d'accent Feedback (journal du 25/09), pas par
 * la couleur d'action. Photos en bouton pilule, applicabilité en Toggle Switch, dépliage par un bouton
 * 40 (aria-expanded) ; le premier contrôle est déplié.
 */
@Component({
  selector: 'ex-liste-depliable-inspection',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './liste-depliable-inspection.html',
  styleUrl: './liste-depliable-inspection.css',
})
export class ListeDepliableInspection {
  protected readonly controles = [
    { id: 'c1', titre: 'Système de verrouillage', lieu: 'Contrôle 4 · Zone A', photos: 2 },
    { id: 'c2', titre: 'Garde-corps du pont roulant', lieu: 'Contrôle 5 · Zone A', photos: 0 },
    { id: 'c3', titre: 'Arrêt d’urgence de la cisaille', lieu: 'Contrôle 6 · Zone B', photos: 1 },
  ];
  protected readonly resultats = signal<Record<string, string>>({ c1: 'ok', c2: 'ko' });
  protected readonly ouvert = signal('c1');

  protected noter(id: string, valeur: string): void {
    this.resultats.update((r) => ({ ...r, [id]: valeur }));
  }
}
