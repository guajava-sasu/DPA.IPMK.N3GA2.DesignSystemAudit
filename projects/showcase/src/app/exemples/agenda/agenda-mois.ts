import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

interface Evenement {
  heure?: string;
  titre: string;
  couleur?: string;
}

function cle(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Vue mois
 * Tableau de six semaines (structure exigée par l'audit) : en-têtes de colonnes abrégés (abbr), date
 * en bouton (aria-pressed pour le jour choisi, aria-current="date" pour aujourd'hui, inactif hors du
 * mois : couleur Disabled du Figma), événements en liste ; au-delà de trois, deux restent visibles et
 * « n de plus » ouvre le reste. Vues Semaine et Jour à composer avec les mêmes briques (journal du
 * 25/09).
 */
@Component({
  selector: 'ex-agenda-mois',
  imports: [MatButtonModule, MatIconModule, MatButtonToggleModule],
  templateUrl: './agenda-mois.html',
  styleUrl: './agenda-mois.css',
})
export class AgendaMois {
  protected readonly aujourdhui = new Date(2026, 10, 12);
  protected readonly cleAujourdhui = cle(this.aujourdhui);
  protected readonly joursSemaine = [
    ['Lun', 'lundi'],
    ['Mar', 'mardi'],
    ['Mer', 'mercredi'],
    ['Jeu', 'jeudi'],
    ['Ven', 'vendredi'],
    ['Sam', 'samedi'],
    ['Dim', 'dimanche'],
  ];
  protected readonly mois = signal(new Date(2026, 10, 1));
  protected readonly choisi = signal(cle(new Date(2026, 10, 18)));
  protected readonly ouvert = signal('');
  private readonly evenements: Record<string, Evenement[]> = {
    '2026-11-02': [{ titre: 'Arrêt programmé', couleur: 'gui-orange' }],
    '2026-11-05': [{ heure: '09:15', titre: 'Revue qualité' }],
    '2026-11-10': [
      { heure: '06:00', titre: 'Changement de zinc', couleur: 'gui-navy' },
      { heure: '14:00', titre: 'Audit sécurité', couleur: 'gui-green' },
    ],
    '2026-11-12': [
      { heure: '09:15', titre: 'Point de poste' },
      { titre: 'Campagne ZM', couleur: 'gui-green' },
    ],
    '2026-11-18': [
      { heure: '08:00', titre: 'Étalonnage jauges', couleur: 'gui-purple' },
      { heure: '10:30', titre: 'Revue des défauts' },
      { heure: '13:30', titre: 'Formation cisaille', couleur: 'gui-green' },
      { heure: '16:00', titre: 'Passation', couleur: 'gui-grey' },
    ],
    '2026-11-23': [
      { titre: 'Maintenance four', couleur: 'gui-orange' },
      { heure: '11:00', titre: 'Essais galva', couleur: 'gui-navy' },
    ],
    '2026-11-27': [{ heure: '15:00', titre: 'Bilan du mois', couleur: 'gui-purple' }],
  };
  protected readonly titre = computed(() => {
    const t = this.mois().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    return t.charAt(0).toUpperCase() + t.slice(1);
  });
  protected readonly semaines = computed(() => {
    const m = this.mois();
    const debut = new Date(m.getFullYear(), m.getMonth(), 1 - ((m.getDay() + 6) % 7));
    return Array.from({ length: 6 }, (_, s) =>
      Array.from({ length: 7 }, (_, j) => {
        const d = new Date(debut.getFullYear(), debut.getMonth(), debut.getDate() + s * 7 + j);
        const k = cle(d);
        return {
          cle: k,
          jour: d.getDate(),
          dehors: d.getMonth() !== m.getMonth(),
          libelle: d.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          evenements: this.evenements[k] ?? [],
        };
      }),
    );
  });

  protected decaler(n: number): void {
    const m = this.mois();
    this.mois.set(new Date(m.getFullYear(), m.getMonth() + n, 1));
  }

  protected allerA(d: Date): void {
    this.mois.set(new Date(d.getFullYear(), d.getMonth(), 1));
    this.choisi.set(cle(d));
  }
}
