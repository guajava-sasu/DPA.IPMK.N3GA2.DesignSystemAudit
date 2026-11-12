import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/**
 * Connexion SSO
 * Type SSO : logotype ArcelorMittal (version blanche en mode sombre), nom de l'application en H6, bouton Filled Primary
 * Large de 440 px dans un panneau de 480 (gui-login-sso, libellé sur deux lignes si le panneau rétrécit), aide en Body 2. Le panneau est un <main> ou une région nommée de la page
 * de connexion.
 */
@Component({
  selector: 'ex-connexion-sso',
  imports: [MatButtonModule],
  templateUrl: './connexion-sso.html',
  styleUrl: './connexion-sso.css',
})
export class ConnexionSso {}
