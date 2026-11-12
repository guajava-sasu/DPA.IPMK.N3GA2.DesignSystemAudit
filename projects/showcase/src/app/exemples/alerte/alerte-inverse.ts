import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Style Dark (gui-inverse) et action
 * Alert Dark (équivalent du snackbar, déprécié le 14/09) : Background/Inverse, texte
 * Foreground/Inverse, icône Feedback/<Type>/Inverse. Les boutons d'action et de fermeture prennent la
 * variante gui-inverse (Text/Inverse du Figma). En mode sombre, le fond inverse devient clair.
 */
@Component({
  selector: 'ex-alerte-inverse',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './alerte-inverse.html',
  styleUrl: './alerte-inverse.css',
})
export class AlerteInverse {
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
