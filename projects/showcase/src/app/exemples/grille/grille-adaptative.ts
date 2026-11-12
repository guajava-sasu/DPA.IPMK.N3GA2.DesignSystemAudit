import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

/**
 * Cartes adaptatives
 * Grille sans classe de format : elle suit la largeur de la fenêtre. Chaque carte prend 1/4 en desktop
 * (gui-span-3), 1/2 en tablette (gui-span-md-6) et toute la largeur en mobile (gui-span-sm-12). Dans
 * la vitrine, la marge suit donc la fenêtre et non le panneau : 96 px entre 744 et 1439 px de large.
 */
@Component({
  selector: 'ex-grille-adaptative',
  imports: [MatCardModule],
  templateUrl: './grille-adaptative.html',
  styleUrl: './grille-adaptative.css',
})
export class GrilleAdaptative {
  protected readonly indicateurs = [
    { libelle: 'Bobines en ligne', valeur: '12' },
    { libelle: 'Vitesse de ligne', valeur: '118 m/min' },
    { libelle: 'Tonnage du poste', valeur: '1 240 t' },
    { libelle: 'Défauts ouverts', valeur: '3' },
  ];
}
