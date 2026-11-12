import { Component, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

/**
 * Deux lignes, élément courant et désactivé
 * List Item Lines=Two (64 px) dans une mat-nav-list : sous-titre en Caption Foreground/Secondary,
 * icône de fin 24, survol Action/Neutral/Subtle, élément courant (activated) en Action/Secondary/Tint,
 * élément désactivé.
 */
@Component({
  selector: 'ex-liste-navigation',
  imports: [MatListModule, MatIconModule],
  templateUrl: './liste-navigation.html',
  styleUrl: './liste-navigation.css',
})
export class ListeNavigation {
  protected readonly courante = signal('Données de soudage');
  protected readonly fiches = [
    { icone: 'description', titre: 'Fiche produit', detail: 'Nuance, dimensions, client', inactive: false },
    { icone: 'construction', titre: 'Données de soudage', detail: 'Bobine aval B24-0415', inactive: false },
    { icone: 'report', titre: 'Défauts', detail: '2 défauts déclarés', inactive: false },
    { icone: 'lock', titre: 'Historique Sybase', detail: 'Accès non ouvert', inactive: true },
  ];
}
