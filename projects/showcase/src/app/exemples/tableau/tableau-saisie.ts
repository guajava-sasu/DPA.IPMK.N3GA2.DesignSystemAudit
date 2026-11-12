import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Saisie dans le tableau (Input)
 * Cellule Type=Input (journal du 05/10) : champ Input Base Small (32 px) dans la cellule, libellé
 * accessible porté par la cellule d'en-tête de ligne (role rowheader, aria-labelledby). Ici, consignes
 * de recette modifiables en place.
 */
@Component({
  selector: 'ex-tableau-saisie',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './tableau-saisie.html',
  styleUrl: './tableau-saisie.css',
})
export class TableauSaisie {
  protected readonly colonnes = ['parametre', 'consigne', 'unite'];
  protected readonly consignes = [
    { id: 'four', parametre: 'Température du four', valeur: 760, unite: '°C' },
    { id: 'bain', parametre: 'Température du bain', valeur: 460, unite: '°C' },
    { id: 'vitesse', parametre: 'Vitesse de ligne', valeur: 120, unite: 'm/min' },
  ];
}
