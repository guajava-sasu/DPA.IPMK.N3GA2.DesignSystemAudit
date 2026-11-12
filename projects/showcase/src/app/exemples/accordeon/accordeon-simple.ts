import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

/**
 * Accordion
 * Accordion Size=Default : conteneur Border/Strong Radius/L (classe gui-accordion), panneaux séparés
 * par Border/Subtle, en-tête 48 px en Body 1 avec chevron 24, survol Action/Neutral/Subtle, contenu
 * Body 2. Un seul panneau ouvert à la fois (comportement par défaut de mat-accordion).
 */
@Component({
  selector: 'ex-accordeon-simple',
  imports: [MatExpansionModule],
  templateUrl: './accordeon-simple.html',
  styleUrl: './accordeon-simple.css',
})
export class AccordeonSimple {}
