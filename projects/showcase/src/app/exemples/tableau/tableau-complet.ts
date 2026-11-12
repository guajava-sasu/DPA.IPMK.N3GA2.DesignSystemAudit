import { Component, AfterViewInit, viewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Bobine {
  reference: string;
  nuance: string;
  epaisseur: number;
  poids: number;
  statut: { libelle: string; couleur: 'success' | 'info' | 'warning' | 'error' };
}

const PRODUITE = { libelle: 'Produite', couleur: 'success' } as const;
const EN_COURS = { libelle: 'En cours', couleur: 'info' } as const;
const ATTENTE = { libelle: 'En attente', couleur: 'warning' } as const;
const BLOQUEE = { libelle: 'Bloquée', couleur: 'error' } as const;

const BOBINES: Bobine[] = [
  { reference: 'B24-0412', nuance: 'DX51D+Z', epaisseur: 0.75, poids: 18.4, statut: PRODUITE },
  { reference: 'B24-0413', nuance: 'DX52D+Z', epaisseur: 1.2, poids: 21.7, statut: PRODUITE },
  { reference: 'B24-0414', nuance: 'S350GD+Z', epaisseur: 2, poids: 24.9, statut: EN_COURS },
  { reference: 'B24-0415', nuance: 'DX51D+Z', epaisseur: 0.6, poids: 15.2, statut: ATTENTE },
  { reference: 'B24-0416', nuance: 'DX54D+Z', epaisseur: 0.8, poids: 17.8, statut: ATTENTE },
  { reference: 'B24-0417', nuance: 'S250GD+Z', epaisseur: 1.5, poids: 22.3, statut: BLOQUEE },
  { reference: 'B24-0418', nuance: 'DX51D+Z', epaisseur: 0.9, poids: 19.6, statut: ATTENTE },
  { reference: 'B24-0419', nuance: 'DX53D+Z', epaisseur: 1, poids: 20.1, statut: ATTENTE },
  { reference: 'B24-0420', nuance: 'S320GD+Z', epaisseur: 1.75, poids: 23.5, statut: ATTENTE },
  { reference: 'B24-0421', nuance: 'DX51D+Z', epaisseur: 0.7, poids: 16.9, statut: ATTENTE },
  { reference: 'B24-0422', nuance: 'DX52D+Z', epaisseur: 1.1, poids: 21, statut: ATTENTE },
  { reference: 'B24-0423', nuance: 'DX51D+Z', epaisseur: 0.5, poids: 14.3, statut: ATTENTE },
];

/**
 * Tableau complet
 * Table Density=Default (journal des 16/09, 24/09 et 05/10) : en-tête avec titre, description et
 * action, colonne de cases en Secondary, colonnes triables (unfold_more tant qu'elles ne sont pas
 * triées), quantités alignées à droite, statut en Badge, actions en boutons d'icône 32, paginateur
 * Material en français. Ligne cochée en Action/Secondary/Tint (classe gui-selected).
 */
@Component({
  selector: 'ex-tableau-complet',
  imports: [
    DecimalPipe,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './tableau-complet.html',
  styleUrl: './tableau-complet.css',
})
export class TableauComplet implements AfterViewInit {
  protected readonly colonnes = [
    'choix',
    'reference',
    'nuance',
    'epaisseur',
    'poids',
    'statut',
    'actions',
  ];
  protected readonly source = new MatTableDataSource(BOBINES);
  protected readonly choix = new SelectionModel<Bobine>(true, [BOBINES[1]]);
  private readonly tri = viewChild.required(MatSort);
  private readonly pagination = viewChild.required(MatPaginator);

  ngAfterViewInit(): void {
    this.source.sort = this.tri();
    this.source.paginator = this.pagination();
  }

  protected toutCoche(): boolean {
    return this.choix.selected.length === this.source.data.length;
  }

  protected basculerTout(): void {
    if (this.toutCoche()) {
      this.choix.clear();
    } else {
      this.choix.select(...this.source.data);
    }
  }
}
