import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/**
 * Fichiers déposés (File Item)
 * Liste ul.gui-file-list : en cours (barre de progression 4 px et bouton Annuler), terminé (Status
 * Success et bouton Retirer), refusé (bord Border/Error et message qui donne le motif et les formats
 * acceptés, journal du 25/09).
 */
@Component({
  selector: 'ex-fichier-liste',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './fichier-liste.html',
  styleUrl: './fichier-liste.css',
})
export class FichierListe {}
