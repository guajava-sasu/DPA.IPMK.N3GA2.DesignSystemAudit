import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

/**
 * Split
 * Action principale et chevron (Button Icon) accolés à 1 px, même style, même couleur et même taille
 * (journal du 28/09) : conteneur span.gui-split. Le chevron porte son propre nom accessible.
 */
@Component({
  selector: 'ex-bouton-menu-scinde',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './bouton-menu-scinde.html',
  styleUrl: './bouton-menu-scinde.css',
})
export class BoutonMenuScinde {}
