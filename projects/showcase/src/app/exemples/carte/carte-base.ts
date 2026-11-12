import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

/**
 * Carte
 * Radius/L (10 px), bord Border/Strong 1 px (l'élévation AMF se fait par la bordure, sans ombre),
 * marges et espacement 16 px.
 */
@Component({
  selector: 'ex-carte-base',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './carte-base.html',
  styleUrl: './carte-base.css',
})
export class CarteBase {}
