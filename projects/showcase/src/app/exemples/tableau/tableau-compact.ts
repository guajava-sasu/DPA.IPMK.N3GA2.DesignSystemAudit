import { Component, AfterViewInit, viewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const EVENEMENTS = [
  { heure: '06:12', zone: 'Entrée', evenement: 'Soudure bobine B24-0414', duree: 3 },
  { heure: '06:41', zone: 'Four', evenement: 'Changement de consigne', duree: 12 },
  { heure: '07:05', zone: 'Bain de zinc', evenement: 'Mesure épaisseur hors tolérance', duree: 6 },
  { heure: '07:30', zone: 'Sortie', evenement: 'Coupe cisaille', duree: 1 },
  { heure: '08:02', zone: 'Entrée', evenement: 'Arrêt dérouleuse 2', duree: 18 },
];

/**
 * Densité Compact et tri
 * Table Density=Compact : en-tête et lignes de 40 px (classe gui-compact sur le conteneur). Le journal
 * des événements est trié par heure décroissante : libellé de la colonne triée en Foreground/Primary
 * avec sa flèche, les autres colonnes triables gardent unfold_more en Foreground/Disabled. Sans en-
 * tête ni paginateur.
 */
@Component({
  selector: 'ex-tableau-compact',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './tableau-compact.html',
  styleUrl: './tableau-compact.css',
})
export class TableauCompact implements AfterViewInit {
  protected readonly colonnes = ['heure', 'zone', 'evenement', 'duree'];
  protected readonly source = new MatTableDataSource(EVENEMENTS);
  private readonly tri = viewChild.required(MatSort);

  ngAfterViewInit(): void {
    this.source.sort = this.tri();
  }
}
