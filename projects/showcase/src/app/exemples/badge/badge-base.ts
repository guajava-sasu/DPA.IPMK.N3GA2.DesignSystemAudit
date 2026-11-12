import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Types et styles
 * Pilule : fond Feedback/<Type>/Background, bord Solid, texte Foreground. Inversé (gui-inverted) :
 * fond Solid, texte On Solid. Icône sémantique facultative.
 */
@Component({
  selector: 'ex-badge-base',
  imports: [MatIconModule],
  templateUrl: './badge-base.html',
  styleUrl: './badge-base.css',
})
export class BadgeBase {}
