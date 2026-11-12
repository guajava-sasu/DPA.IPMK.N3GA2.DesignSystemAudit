import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

/**
 * Icône, description, désactivé et Compact
 * Expansion Panel avec icône 24 (Slot Icon) et description en Body 2 Foreground/Secondary, panneau
 * désactivé (Interaction=Disabled), et densité Compact (classe gui-compact : marges de 16). Plusieurs
 * panneaux ouverts à la fois avec multi.
 */
@Component({
  selector: 'ex-accordeon-details',
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './accordeon-details.html',
  styleUrl: './accordeon-details.css',
})
export class AccordeonDetails {}
