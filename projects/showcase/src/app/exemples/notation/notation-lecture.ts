import { Component } from '@angular/core';

/**
 * Lecture seule
 * Étoiles générées par le CSS (gui-filled, gui-half, vide) : l'ensemble porte un nom accessible
 * (role="img"), la valeur texte reste visible. Tailles Small 16 (gui-sm, valeur en Caption), Medium
 * 24, Large 32 (gui-lg).
 */
@Component({
  selector: 'ex-notation-lecture',
  imports: [],
  templateUrl: './notation-lecture.html',
  styleUrl: './notation-lecture.css',
})
export class NotationLecture {
  protected readonly tailles = ['gui-sm', '', 'gui-lg'];
}
