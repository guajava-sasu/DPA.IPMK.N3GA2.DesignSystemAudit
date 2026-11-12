import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Niveaux repliés (Collapsed)
 * Breadcrumb Items=Collapsed : au-delà de 4 niveaux, les niveaux intermédiaires se replient derrière
 * un bouton « … » (survol Action/Neutral/Subtle) qui ouvre un mat-menu.
 */
@Component({
  selector: 'ex-fil-ariane-replie',
  imports: [MatMenuModule],
  templateUrl: './fil-ariane-replie.html',
  styleUrl: './fil-ariane-replie.css',
})
export class FilArianeReplie {}
