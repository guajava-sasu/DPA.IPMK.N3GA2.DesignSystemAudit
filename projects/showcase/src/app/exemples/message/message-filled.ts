import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Filled (taille M)
 * Message persistant dans la page : Feedback Solid, texte et icône On Solid, marges 16, icône 24.
 * Actions facultatives sous le texte (boutons gui-inverse, Text/Inverse du Figma), bouton Fermer
 * facultatif. Ajouté dynamiquement, un message d'erreur prend role="alert".
 */
@Component({
  selector: 'ex-message-filled',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './message-filled.html',
  styleUrl: './message-filled.css',
})
export class MessageFilled {
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
