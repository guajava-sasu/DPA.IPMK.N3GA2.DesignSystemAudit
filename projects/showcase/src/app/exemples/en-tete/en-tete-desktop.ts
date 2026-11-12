import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Desktop (64 px)
 * Bandeau d'application : marque à gauche (logotype ArcelorMittal, version blanche en mode sombre, puis nom de l'application),
 * actions à droite : CTA Filled, statut de la ligne, étiquette, notifications avec Count, compte
 * (Avatar S, nom, rôle, menu). Le <header> est le repère banner de la page.
 */
@Component({
  selector: 'ex-en-tete-desktop',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './en-tete-desktop.html',
  styleUrl: './en-tete-desktop.css',
})
export class EnTeteDesktop {}
