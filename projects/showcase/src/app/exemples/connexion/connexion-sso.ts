import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/**
 * Connexion SSO
 * Type SSO : logotype (remplacé ici par un texte), nom de l'application en H6, bouton Filled Primary
 * Large sur toute la largeur, aide en Body 2. Le panneau est un <main> ou une région nommée de la page
 * de connexion.
 */
@Component({
  selector: 'ex-connexion-sso',
  imports: [MatButtonModule],
  templateUrl: './connexion-sso.html',
  styleUrl: './connexion-sso.css',
})
export class ConnexionSso {}
