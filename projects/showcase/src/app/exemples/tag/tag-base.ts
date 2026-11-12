import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Couleurs
 * Radius/S, fond Accent/<Couleur>/Subtle et texte On Subtle ; Brand en primaire. Inversé : fond
 * Strong, texte On Strong. Le tag classe, le badge signale un état.
 */
@Component({
  selector: 'ex-tag-base',
  imports: [MatIconModule],
  templateUrl: './tag-base.html',
  styleUrl: './tag-base.css',
})
export class TagBase {}
