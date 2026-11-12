import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

/**
 * Ordre des contrôles
 * Glisser-déposer du CDK (cdkDropList, cdkDrag, poignée cdkDragHandle), sans transition quand les
 * animations sont coupées (postes RDS). Au clavier, la poignée déplace l'élément avec les flèches haut et
 * bas ; une région aria-live annonce la nouvelle position. Élément désactivé : cdkDragDisabled et aria-disabled.
 */
@Component({
  selector: 'ex-liste-reordonnable-controles',
  imports: [MatButtonModule, MatIconModule, MatSlideToggleModule, DragDropModule],
  templateUrl: './liste-reordonnable-controles.html',
  styleUrl: './liste-reordonnable-controles.css',
})
export class ListeReordonnableControles {
  protected readonly controles = signal([
    { id: 'c1', titre: 'Système de verrouillage', lieu: 'Contrôle 1 · Zone A', photos: 2, statut: { classe: 'gui-success', libelle: 'Complété' } },
    { id: 'c2', titre: 'Garde-corps du pont roulant', lieu: 'Contrôle 2 · Zone A', photos: 0, statut: { classe: 'gui-info', libelle: 'En cours' } },
    { id: 'c3', titre: 'Arrêt d’urgence de la cisaille', lieu: 'Contrôle 3 · Zone B', photos: 1, statut: { classe: 'gui-warning', libelle: 'À reprendre' } },
    { id: 'c4', titre: 'Éclairage du four', lieu: 'Contrôle 4 · Zone C', photos: 0, statut: { classe: 'gui-neutral', libelle: 'Hors périmètre' }, inactif: true },
  ]);
  protected readonly annonce = signal('');

  protected deposer(e: CdkDragDrop<unknown>): void {
    this.bouger(e.previousIndex, e.currentIndex);
  }

  protected deplacer(i: number, sens: number, e: Event): void {
    e.preventDefault();
    const cible = i + sens;
    if (cible < 0 || cible >= this.controles().length || this.controles()[cible].inactif) return;
    this.bouger(i, cible);
    // La poignée garde le focus : on la retrouve à sa nouvelle place après le rendu.
    const liste = (e.target as HTMLElement).closest('ul');
    setTimeout(() => (liste?.querySelectorAll<HTMLButtonElement>('.gui-reorderable-handle')[cible])?.focus());
  }

  private bouger(de: number, vers: number): void {
    if (de === vers) return;
    const l = [...this.controles()];
    moveItemInArray(l, de, vers);
    this.controles.set(l);
    this.annonce.set(`${l[vers].titre} déplacé en position ${vers + 1} sur ${l.length}.`);
  }
}
