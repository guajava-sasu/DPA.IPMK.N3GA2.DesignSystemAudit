import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';

/**
 * Rich (toggletip)
 * Pas d'équivalent Material : bulle ouverte au clic par cdkConnectedOverlay (Surface, Border/Strong,
 * Radius/M, marges 12 / 8, titre Form Label, texte Body 2 secondaire, 282 de large). Échap ou un clic
 * à l'extérieur la ferment ; le bouton porte aria-expanded.
 */
@Component({
  selector: 'ex-infobulle-riche',
  imports: [MatButtonModule, MatIconModule, OverlayModule],
  templateUrl: './infobulle-riche.html',
  styleUrl: './infobulle-riche.css',
})
export class InfobulleRiche {
  protected readonly ouvert = signal(false);

  protected clavier(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.ouvert.set(false);
  }
}
