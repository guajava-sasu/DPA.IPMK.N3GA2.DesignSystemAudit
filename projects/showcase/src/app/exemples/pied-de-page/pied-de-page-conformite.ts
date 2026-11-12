import { Component } from '@angular/core';

/**
 * Footer et mention de conformité
 * 40 px, Surface Subtle, mention à gauche, liens à droite en Foreground/Link. Le premier lien donne
 * l'état de conformité RGAA (non conforme, partiellement conforme, totalement conforme), obligatoire.
 * Les liens ouvrent dans le même onglet (pas de _blank sur les postes RDS).
 */
@Component({
  selector: 'ex-pied-de-page-conformite',
  imports: [],
  templateUrl: './pied-de-page-conformite.html',
  styleUrl: './pied-de-page-conformite.css',
})
export class PiedDePageConformite {
  protected readonly conformites = [
    'non conforme',
    'partiellement conforme',
    'totalement conforme',
  ];
}
