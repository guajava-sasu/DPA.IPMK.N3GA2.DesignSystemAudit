import { Component } from '@angular/core';

/**
 * Raccourcis d’accueil
 * Tuiles d'action Medium (128 × 106) et Large (gui-lg, 160 × 120) : icône Foreground/Brand, libellé
 * centré. Un CTA Bloc est un <button> (ou un <a> s'il mène à une page) ; désactivé, il garde sa place.
 */
@Component({
  selector: 'ex-bloc-action-raccourcis',
  imports: [],
  templateUrl: './bloc-action-raccourcis.html',
  styleUrl: './bloc-action-raccourcis.css',
})
export class BlocActionRaccourcis {
  protected readonly raccourcis = [
    { icone: 'add_circle', libelle: 'Créer une requête' },
    { icone: 'inventory_2', libelle: 'Bobines en attente' },
    { icone: 'build', libelle: 'Déclarer un arrêt' },
    { icone: 'assignment', libelle: 'Consignes du poste' },
    { icone: 'lock', libelle: 'Archives', inactif: true },
  ];
}
