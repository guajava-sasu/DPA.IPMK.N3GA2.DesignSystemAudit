import { Component, signal } from '@angular/core';

/**
 * Saisie (Interactive)
 * Un bouton radio natif masqué par étoile dans un role="radiogroup" : flèches du clavier pour changer
 * la note, anneau de focus autour de l'étoile, écart 8. La valeur choisie s'affiche à droite.
 */
@Component({
  selector: 'ex-notation-saisie',
  imports: [],
  templateUrl: './notation-saisie.html',
  styleUrl: './notation-saisie.css',
})
export class NotationSaisie {
  protected readonly etoiles = [1, 2, 3, 4, 5];
  protected readonly note = signal(4);
}
