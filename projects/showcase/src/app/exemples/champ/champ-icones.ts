import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

/**
 * Icônes et tailles
 * Icône de début (matPrefix) ou de fin (matSuffix) en 20 px. Champs de 32 / 40 / 48 px (gui-sm,
 * défaut, gui-lg sur .gui-field).
 */
@Component({
  selector: 'ex-champ-icones',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './champ-icones.html',
  styleUrl: './champ-icones.css',
})
export class ChampIcones {}
