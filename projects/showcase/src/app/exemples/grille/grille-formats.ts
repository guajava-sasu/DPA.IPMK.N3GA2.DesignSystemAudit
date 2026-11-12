import { Component } from '@angular/core';

/**
 * Trois formats
 * Cadres du Figma à leur largeur réelle : mobile 320 px (gui-grid-mobile, marge 16, gouttière 16),
 * tablette 744 px (gui-grid-tablet, marge 96, gouttière 24), desktop 1440 px (gui-grid-desktop, marge
 * 24, gouttière 16). Les colonnes restent fluides, seules la marge et la gouttière changent. Sans
 * classe de format, la grille suit la largeur de la fenêtre (seuils 744 et 1440, à confirmer).
 */
@Component({
  selector: 'ex-grille-formats',
  imports: [],
  templateUrl: './grille-formats.html',
  styleUrl: './grille-formats.css',
})
export class GrilleFormats {
  protected readonly colonnes = Array.from({ length: 12 }, (_, i) => i + 1);
  protected readonly formats = [
    { nom: 'Mobile 320 px : marge 16, gouttière 16', classe: 'gui-grid-mobile', largeur: 320 },
    { nom: 'Tablette 744 px : marge 96, gouttière 24', classe: 'gui-grid-tablet', largeur: 744 },
    { nom: 'Desktop 1440 px : marge 24, gouttière 16', classe: 'gui-grid-desktop', largeur: 1440 },
  ];
}
