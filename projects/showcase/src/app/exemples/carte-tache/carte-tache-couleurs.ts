import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Tâches de manutention
 * Bandeau d'accent et Tag de zone de la même couleur (Blue par défaut, gui-purple, gui-orange, gui-
 * green, gui-navy, gui-grey) ; champs en liste de définitions (dl) ; ombre Lv2 au survol. Le titre est
 * un vrai titre (h3 ici) pour la navigation au clavier des aides techniques.
 */
@Component({
  selector: 'ex-carte-tache-couleurs',
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './carte-tache-couleurs.html',
  styleUrl: './carte-tache-couleurs.css',
})
export class CarteTacheCouleurs {
  protected readonly taches = [
    { titre: 'Tâche #1', couleur: '', zone: 'Zone A', champs: [['Retrait', 'ACL 1'], ['Dépôt', 'STOCK 2'], ['Estimation', '00:10']], statut: ['gui-info', 'En cours'] },
    { titre: 'Tâche #2', couleur: 'gui-purple', zone: 'Zone B', champs: [['Retrait', 'Four'], ['Dépôt', 'Cisaille'], ['Estimation', '00:05']], statut: ['gui-neutral', 'À faire'] },
    { titre: 'Tâche #3', couleur: 'gui-orange', zone: 'Zone C', champs: [['Retrait', 'STOCK 1'], ['Dépôt', 'Entrée'], ['Estimation', '00:15']], statut: ['gui-warning', 'En retard'] },
    { titre: 'Tâche #4', couleur: 'gui-green', zone: 'Zone A', champs: [['Retrait', 'Sortie'], ['Dépôt', 'Expédition'], ['Estimation', '00:20']], statut: ['gui-success', 'Terminée'] },
    { titre: 'Tâche #5', couleur: 'gui-navy', zone: 'Zone D', champs: [['Retrait', 'ACL 2'], ['Dépôt', 'STOCK 3'], ['Estimation', '00:12']], statut: ['gui-info', 'En cours'] },
    { titre: 'Tâche #6', couleur: 'gui-grey', zone: 'Zone B', champs: [['Retrait', 'Entrée'], ['Dépôt', 'STOCK 1'], ['Estimation', '00:08']], statut: ['gui-error', 'Bloquée'] },
  ];
}
