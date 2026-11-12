import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Empty, Loading et Error
 * Marges 48 / 24, centré, écart 16 ; illustration ronde de 64 (Surface Subtle,
 * Feedback/Error/Background pour l'erreur) avec icône 32 ou spinner 40 ; titre Body 1 Medium, message
 * Body 2 secondaire (480 au plus), action Outlined Neutral. L'état de chargement est une région
 * role="status" ; son spinner est déterminé ou figé (pas d'animation infinie sur les postes RDS).
 */
@Component({
  selector: 'ex-etat-vide-types',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './etat-vide-types.html',
  styleUrl: './etat-vide-types.css',
})
export class EtatVideTypes {}
