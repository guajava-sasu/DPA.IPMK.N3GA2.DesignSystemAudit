import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Progress Spinner
 * Tailles 24 / 40 / 64 (gui-sm, défaut, gui-lg) avec traits 3 / 4 / 5 à reporter dans diameter et
 * strokeWidth ; anneau de piste Border/Subtle ajouté par le CSS. Couleurs Primary, Secondary et
 * Inverse (gui-inverse, Foreground/Inverse et piste à 24 %), cette dernière posée sur une surface
 * sombre.
 */
@Component({
  selector: 'ex-chargement-spinner',
  imports: [MatProgressSpinnerModule],
  templateUrl: './chargement-spinner.html',
  styleUrl: './chargement-spinner.css',
})
export class ChargementSpinner {}
