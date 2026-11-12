import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Fil de conversation
 * Utilisateur à droite (Avatar Initials Navy S, bulle Surface Subtle), assistant à gauche (pastille
 * auto_awesome, bulle bordée) avec sources en Chips Assist et actions Copier, Utile, Pas utile,
 * Régénérer sous la bulle. Le fil est une région role="log" ; l'auteur de chaque message est donné en
 * texte masqué. Les points de rédaction (Typing) sont fixes : pas d'animation infinie sur les postes
 * RDS.
 */
@Component({
  selector: 'ex-bulle-conversation-fil',
  imports: [MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './bulle-conversation-fil.html',
  styleUrl: './bulle-conversation-fil.css',
})
export class BulleConversationFil {
  protected readonly avis = signal('');
}
