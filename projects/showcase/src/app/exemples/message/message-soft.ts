import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Soft (gui-soft)
 * Feedback Background, bord Feedback Solid et barre d'accent de 4 px à gauche (journal du 06/10),
 * titre et icône Feedback Foreground, texte Foreground/Primary, Fermer en Neutral. Taille S (gui-sm)
 * pour les deux derniers : marges 12, icône 20.
 */
@Component({
  selector: 'ex-message-soft',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './message-soft.html',
  styleUrl: './message-soft.css',
})
export class MessageSoft {
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
}
