import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Réponse en erreur
 * State Error : icône et message en Feedback/Error/Foreground, bouton Text Neutral Small « Réessayer »
 * dans la bulle.
 */
@Component({
  selector: 'ex-bulle-conversation-erreur',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './bulle-conversation-erreur.html',
  styleUrl: './bulle-conversation-erreur.css',
})
export class BulleConversationErreur {}
