import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Styles et tailles
 * Outlined (défaut) ou Filled (gui-filled, fond Neutral Subtle) ; Medium 32 px (défaut) ou Small 24 px
 * (gui-sm, Caption). Désactivé : Action/Disabled.
 */
@Component({
  selector: 'ex-chip-tailles',
  imports: [MatChipsModule],
  templateUrl: './chip-tailles.html',
  styleUrl: './chip-tailles.css',
})
export class ChipTailles {}
