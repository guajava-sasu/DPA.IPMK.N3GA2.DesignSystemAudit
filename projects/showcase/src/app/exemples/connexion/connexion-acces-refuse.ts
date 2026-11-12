import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Accès refusé
 * Type Access Denied : titre H6, Message Info Soft Error qui explique la cause et la marche à suivre,
 * bouton Outlined Neutral de retour.
 */
@Component({
  selector: 'ex-connexion-acces-refuse',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './connexion-acces-refuse.html',
  styleUrl: './connexion-acces-refuse.css',
})
export class ConnexionAccesRefuse {}
