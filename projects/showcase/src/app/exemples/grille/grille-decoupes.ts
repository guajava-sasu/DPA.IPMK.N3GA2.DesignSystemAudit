import { Component } from '@angular/core';

/**
 * Découpes de la page
 * Grille de 12 colonnes au format desktop (gui-grid gui-grid-desktop : marge 24, gouttière 16) :
 * découpes 1/1, 1/2, 1/3, 1/4, 1/6 et 1/12 par gui-span-12, 6, 4, 3, 2 et 1. Un enfant sans classe
 * gui-span prend toute la largeur. La découpe 1/8 dessinée dans le Figma n'existe pas sur 12 colonnes.
 */
@Component({
  selector: 'ex-grille-decoupes',
  imports: [],
  templateUrl: './grille-decoupes.html',
  styleUrl: './grille-decoupes.css',
})
export class GrilleDecoupes {
  protected readonly cellules = [
    { nom: '1/1', span: 12 },
    { nom: '1/2', span: 6 },
    { nom: '1/3', span: 4 },
    { nom: '1/4', span: 3 },
    { nom: '1/6', span: 2 },
    { nom: '1/12', span: 1 },
  ].flatMap((d) => Array.from({ length: 12 / d.span }, (_, i) => ({ ...d, id: `${d.nom}-${i}` })));
}
