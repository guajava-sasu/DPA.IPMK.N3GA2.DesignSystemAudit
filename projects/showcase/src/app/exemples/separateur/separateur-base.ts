import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Séparateurs
 * Ligne 1 px Border/Default ; gui-subtle pour Border/Subtle ; gui-inset pour le retrait de 16 px ;
 * vertical entre deux éléments d'une barre.
 */
@Component({
  selector: 'ex-separateur-base',
  imports: [MatDividerModule],
  templateUrl: './separateur-base.html',
  styleUrl: './separateur-base.css',
})
export class SeparateurBase {}
