import { Component, computed, signal } from '@angular/core';

/**
 * Choix exclusif
 * État Selected (Secondary Tint, bordure 2 Secondary Default) porté par aria-pressed : chaque tuile
 * est un bouton bascule, l'application garde un seul choix actif. Le groupe est nommé (role="group").
 */
@Component({
  selector: 'ex-bloc-action-choix',
  imports: [],
  templateUrl: './bloc-action-choix.html',
  styleUrl: './bloc-action-choix.css',
})
export class BlocActionChoix {
  protected readonly types = [
    { id: 'qualite', icone: 'verified', libelle: 'Qualité' },
    { id: 'maintenance', icone: 'build', libelle: 'Maintenance' },
    { id: 'logistique', icone: 'local_shipping', libelle: 'Logistique' },
  ];
  protected readonly choix = signal('maintenance');
  protected readonly libelle = computed(() => this.types.find((t) => t.id === this.choix())?.libelle);
}
