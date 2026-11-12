import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Elevated et Outlined, en-tête complet
 * Elevated (mat-card par défaut) : Border/Strong et ombre Lv3, Lv2 au survol ; Outlined
 * (appearance="outlined") : sans ombre, Lv3 au survol. En-tête : titre et Slot Tag (gui-card-title-
 * line), sous-titre, bouton de menu 32 à droite. Largeurs S 280 (gui-sm) et M 400 (gui-md).
 */
@Component({
  selector: 'ex-carte-variantes',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './carte-variantes.html',
  styleUrl: './carte-variantes.css',
})
export class CarteVariantes {
  protected readonly cartes: { titre: string; apparence: 'raised' | 'outlined'; taille: string }[] =
    [
      { titre: 'Elevated, taille S', apparence: 'raised', taille: 'gui-sm' },
      { titre: 'Outlined, taille M', apparence: 'outlined', taille: 'gui-md' },
    ];
}
