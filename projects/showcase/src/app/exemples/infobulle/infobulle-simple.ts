import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipPosition } from '@angular/material/tooltip';

/**
 * Plain (matTooltip)
 * Bulle Background/Inverse, Radius/S, marges 8, Caption en Foreground/Inverse. La flèche de 12 × 6 est
 * facultative : matTooltipClass="gui-tooltip-arrow", orientée selon la position choisie. Elle complète
 * un libellé, jamais une information indispensable (aria-describedby posé par Material).
 */
@Component({
  selector: 'ex-infobulle-simple',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './infobulle-simple.html',
  styleUrl: './infobulle-simple.css',
})
export class InfobulleSimple {
  protected readonly positions: TooltipPosition[] = ['above', 'below', 'left', 'right'];
}
