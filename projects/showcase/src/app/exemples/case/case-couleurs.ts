import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

/**
 * Secondaire et erreur
 * Classe gui-secondary pour le bleu, gui-error pour une case à corriger (bord Border/Error, cochée en
 * Feedback/Error/Solid).
 */
@Component({
  selector: 'ex-case-couleurs',
  imports: [MatCheckboxModule],
  templateUrl: './case-couleurs.html',
  styleUrl: './case-couleurs.css',
})
export class CaseCouleurs {}
