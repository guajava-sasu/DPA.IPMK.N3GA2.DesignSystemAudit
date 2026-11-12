import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Liste simple
 * List Item Lines=One : 48 px, icône 24 en Foreground/Secondary, titre Body 2, valeur de fin en
 * Caption ; sous-titre de section en Form Label Caps et séparateurs Border/Subtle ; liste délimitée
 * par Border/Strong (classe gui-outlined, journal du 24/09).
 */
@Component({
  selector: 'ex-liste-simple',
  imports: [MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './liste-simple.html',
  styleUrl: './liste-simple.css',
})
export class ListeSimple {}
