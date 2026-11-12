import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

/**
 * Liste élevée et Compact
 * List élevée (journal du 29/09 : Background/Surface, Radius/M, ombre Lv2, classe gui-elevated) en
 * densité Compact (40 px, classe gui-compact), ici une mat-action-list de boutons.
 */
@Component({
  selector: 'ex-liste-elevee',
  imports: [MatListModule, MatIconModule],
  templateUrl: './liste-elevee.html',
  styleUrl: './liste-elevee.css',
})
export class ListeElevee {}
