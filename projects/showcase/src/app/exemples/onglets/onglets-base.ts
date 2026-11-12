import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

/**
 * Onglets
 * Hauteur 48 px, libellé BUTTON 2 en capitales. Actif : Foreground/Brand et indicateur primaire 2 px.
 * Survol : Neutral Subtle.
 */
@Component({
  selector: 'ex-onglets-base',
  imports: [MatTabsModule],
  templateUrl: './onglets-base.html',
  styleUrl: './onglets-base.css',
})
export class OngletsBase {}
