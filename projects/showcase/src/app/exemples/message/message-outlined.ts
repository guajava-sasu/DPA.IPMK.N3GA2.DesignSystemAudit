import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Outlined (gui-outlined), taille S
 * Surface et bord Feedback Solid, mêmes couleurs de texte que Soft. Ici en taille S (gui-sm), avec une
 * action Text Neutral sous le message.
 */
@Component({
  selector: 'ex-message-outlined',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './message-outlined.html',
  styleUrl: './message-outlined.css',
})
export class MessageOutlined {
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
