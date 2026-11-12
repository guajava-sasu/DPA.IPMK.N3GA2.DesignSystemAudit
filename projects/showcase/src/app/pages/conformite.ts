import { Component, computed, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CONFORMITE, StatutConformite } from './conformite-donnees';

const LIBELLES: Record<StatutConformite, { texte: string; classe: string }> = {
  conforme: { texte: 'Conforme', classe: 'gui-success' },
  adapte: { texte: 'Adapté', classe: 'gui-info' },
  ecart: { texte: 'Écart', classe: 'gui-warning' },
  'hors-lot': { texte: 'Hors lot', classe: '' },
};

@Component({
  selector: 'vt-conformite',
  imports: [MatButtonToggleModule],
  template: `
    <header class="tete">
      <p class="gui-overline gui-secondary-text">Contrôle</p>
      <h1 class="gui-h4">Conformité au journal du Figma</h1>
      <p class="gui-body-1">
        Chaque décision du journal (page Changelog du .fig, du 12/09 au 26/10/2026) qui touche les
        fondations ou un composant déjà construit (lots 1 à 3), et ce que galma-ui en fait. Les
        couleurs et mesures viennent des jetons générés : une décision de couleur est conforme dès
        que le jeton porte la nouvelle valeur.
      </p>
      <div class="totaux" aria-live="polite">
        @for (t of totaux(); track t.statut) {
          <span class="gui-badge" [class]="'gui-badge ' + t.classe"
            >{{ t.texte }} : {{ t.nombre }}</span
          >
        }
      </div>
    </header>
    <mat-button-toggle-group
      class="gui-sm gui-neutral"
      [value]="filtre()"
      (change)="filtre.set($event.value)"
      aria-label="Filtrer par statut"
    >
      <mat-button-toggle value="tous">Tous</mat-button-toggle>
      <mat-button-toggle value="conforme">Conformes</mat-button-toggle>
      <mat-button-toggle value="adapte">Adaptés</mat-button-toggle>
      <mat-button-toggle value="ecart">Écarts</mat-button-toggle>
      <mat-button-toggle value="hors-lot">Hors lot</mat-button-toggle>
    </mat-button-toggle-group>
    <div class="table" role="region" aria-label="Décisions du journal" tabindex="0">
      <table>
        <caption class="gui-caption gui-secondary-text">
          {{
            lignes().length
          }}
          décisions affichées
        </caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Entrée du journal</th>
            <th scope="col">Décision</th>
            <th scope="col">Statut</th>
            <th scope="col">Dans galma-ui</th>
          </tr>
        </thead>
        <tbody>
          @for (l of lignes(); track $index) {
            <tr>
              <td class="date">{{ l.date }}</td>
              <td>{{ l.entree }}</td>
              <td>{{ l.decision }}</td>
              <td>
                <span [class]="'gui-badge gui-sm ' + libelle(l.statut).classe">{{
                  libelle(l.statut).texte
                }}</span>
              </td>
              <td>{{ l.galma }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tete {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .tete p {
      margin: 0;
      max-width: 90ch;
    }
    .totaux {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .table {
      overflow-x: auto;
      border: 1px solid var(--amf-border-strong);
      border-radius: var(--amf-radius-l);
      background: var(--amf-background-surface);
    }
    .table:focus-visible {
      outline: 2px solid var(--amf-border-focus);
      outline-offset: 2px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      font: var(--amf-text-body-2-weight) var(--amf-text-body-2-size) /
        var(--amf-text-body-2-line-height) var(--gui-font);
    }
    caption {
      text-align: left;
      padding: 8px 12px;
    }
    th {
      text-align: left;
      font-weight: 500;
      background: var(--amf-background-surface-subtle);
      color: var(--amf-foreground-primary);
    }
    th,
    td {
      padding: 8px 12px;
      border-top: 1px solid var(--amf-border-default);
      vertical-align: top;
    }
    .date {
      white-space: nowrap;
      color: var(--amf-foreground-secondary);
    }
  `,
})
export class Conformite {
  protected readonly filtre = signal<'tous' | StatutConformite>('tous');
  protected readonly lignes = computed(() =>
    this.filtre() === 'tous' ? CONFORMITE : CONFORMITE.filter((l) => l.statut === this.filtre()),
  );
  protected readonly totaux = computed(() =>
    (Object.keys(LIBELLES) as StatutConformite[]).map((s) => ({
      statut: s,
      ...LIBELLES[s],
      nombre: CONFORMITE.filter((l) => l.statut === s).length,
    })),
  );
  protected libelle(s: StatutConformite) {
    return LIBELLES[s];
  }
}
