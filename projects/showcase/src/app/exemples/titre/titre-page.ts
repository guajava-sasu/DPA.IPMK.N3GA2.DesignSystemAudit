import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Titre de page (Desktop)
 * Title Size=Desktop : fil d'Ariane, puis bouton retour 48, titre Heading H4 avec un Tag, sous-titre
 * Body 2 en Foreground/Secondary et actions à droite (Outlined Neutral puis Filled Primary, 40 px).
 * Dans une application, le titre est le <h1> de la page.
 */
@Component({
  selector: 'ex-titre-page',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './titre-page.html',
  styleUrl: './titre-page.css',
})
export class TitrePage {}
