import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Types (Style Light)
 * Alert Light : Surface, Border/Strong, ombre Lv2, icône Feedback/<Type>/Foreground. Titre par défaut
 * = mot du type (Information, Succès, Attention, Erreur, Remarque), bouton Fermer toujours présent,
 * pas de disparition automatique (journal du 24/09). Fermer retire l'alerte ; « Réafficher » les
 * remet.
 */
@Component({
  selector: 'ex-alerte-types',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './alerte-types.html',
  styleUrl: './alerte-types.css',
})
export class AlerteTypes {
  protected readonly types = [
    {
      classe: 'gui-info',
      icone: 'info',
      titre: 'Information',
      texte: 'La campagne DX51D+Z démarre à 22 h.',
    },
    {
      classe: 'gui-success',
      icone: 'check_circle',
      titre: 'Succès',
      texte: 'Bobine 2611204 enregistrée en sortie.',
    },
    {
      classe: 'gui-warning',
      icone: 'warning',
      titre: 'Attention',
      texte: 'Température du bain proche du seuil haut.',
    },
    {
      classe: 'gui-error',
      icone: 'error',
      titre: 'Erreur',
      texte: 'Envoi à OG refusé : poids manquant.',
    },
    {
      classe: 'gui-neutral',
      icone: 'info',
      titre: 'Remarque',
      texte: 'Saisie reprise depuis le poste de la cisaille.',
    },
  ];
  protected readonly fermees = signal<string[]>([]);
  protected readonly visibles = computed(() =>
    this.types.filter((t) => !this.fermees().includes(t.classe)),
  );

  protected fermer(classe: string): void {
    this.fermees.update((f) => [...f, classe]);
  }
}
