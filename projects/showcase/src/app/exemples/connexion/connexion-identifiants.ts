import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Identifiant et mot de passe
 * Type Credentials : mention « Sauf indication contraire, tous les champs sont obligatoires » (pas
 * d'astérisque, décision du 24/09), deux Form Fields Large (gui-field gui-lg), bouton Filled Primary
 * Large et lien Text Secondary Small « Mot de passe oublié ».
 */
@Component({
  selector: 'ex-connexion-identifiants',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './connexion-identifiants.html',
  styleUrl: './connexion-identifiants.css',
})
export class ConnexionIdentifiants {}
