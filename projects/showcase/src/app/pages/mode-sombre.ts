import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CONTRASTES, MesureContraste } from '../audit/contrastes.generated';
import { Affichage } from '../commun/affichage';

interface ResultatAxe {
  genere: string;
  outil: string;
  regles: string;
  exceptions?: { regle: string; cible: string; motif: string }[];
  pages: {
    route: string;
    titre: string;
    mode: 'clair' | 'sombre';
    violations: { id: string; impact: string; aide: string; noeuds: number; cibles: string[] }[];
    exceptions?: { id: string; cible: string; motif: string }[];
    reussies: number;
    incompletes: number;
  }[];
}

@Component({
  selector: 'vt-mode-sombre',
  imports: [MatButtonToggleModule, MatButtonModule],
  template: `
    <header class="tete">
      <p class="gui-overline gui-secondary-text">Proposition amf-design-system</p>
      <h1 class="gui-h4">Mode sombre audité</h1>
      <p class="gui-body-1">
        AMF v2.0 n’a pas de mode sombre : le journal le prévoit en modes de variables (« Original
        Dark ») sans l’avoir dessiné. amf-design-system en propose un, en surchargeant les seuls
        jetons sémantiques AMF ; les composants n’ont aucune variante. Il reste à faire valider par
        le comité de relecture AMF, avec les mesures ci-dessous.
      </p>
      <div class="actions">
        <button matButton="filled" class="gui-neutral" type="button" (click)="basculer()">
          {{ affichage.mode() === 'dark' ? 'Revenir au mode clair' : 'Voir la vitrine en sombre' }}
        </button>
      </div>
    </header>

    <section aria-labelledby="ms-principes">
      <h2 class="gui-h6" id="ms-principes">Principes de la proposition</h2>
      <ul class="gui-body-2">
        <li>
          Fonds en gris neutres #151515 (page), #1F1F1F (surface), #262626 (surface atténuée), sans
          teinte.
        </li>
        <li>
          Actions éclaircies d’un cran sur les mêmes palettes AMF : cuivre Orange/300, bleu
          Blue/300, rouge Ruby/400 ; texte foncé dessus.
        </li>
        <li>
          Fonds atténués (Subtle, Tint, Feedback Background) en couleurs translucides : ils restent
          lisibles sur toutes les surfaces.
        </li>
        <li>
          Calques d’état en Alpha/White, comme le prévoit le journal (12/09) ; focus neutre clair
          #F2F2F2.
        </li>
        <li>
          Mêmes seuils que l’audit AMF : 4,5:1 pour le texte, 3:1 pour bordures de champ, focus et
          éléments graphiques. États désactivés exclus, comme dans l’audit CORE du 15/09.
        </li>
      </ul>
    </section>

    <section aria-labelledby="ms-outils">
      <h2 class="gui-h6" id="ms-outils">Outils (open source)</h2>
      <ul class="gui-body-2">
        <li>
          <strong>Contrastes des jetons</strong> : <code>npm run audit:contrastes</code> (script du
          dépôt, sans dépendance) : {{ total }} paires d’usage, WCAG 2.1 et APCA indicatif. Le build
          échoue sous les seuils. Il vérifie aussi qu’aucun fond atténué ne reste clair en sombre :
          ce défaut garde un bon contraste, le calcul WCAG ne le voit pas (repéré sur les Tags
          pendant la mise au point, corrigé).
        </li>
        <li>
          <strong>axe-core</strong> (Deque, MPL 2.0) avec Playwright :
          <code>npm run audit:axe</code> ; chaque page de la vitrine, en clair et en sombre, règles
          WCAG 2.0 / 2.1 A et AA. Les éléments « à vérifier » restants sont les libellés des Toggle
          Buttons, dont axe ne peut pas lire le fond (couche de focus Material par-dessus) ; leurs
          couleurs sont couvertes par l’audit des jetons. Panneaux flottants audités ouverts.
        </li>
      </ul>
    </section>

    <section aria-labelledby="ms-axe">
      <h2 class="gui-h6" id="ms-axe">axe-core sur la vitrine</h2>
      @if (axe(); as a) {
        <p class="gui-body-2 gui-secondary-text">
          {{ a.outil }}, règles {{ a.regles }}, exécuté le
          {{ a.genere.slice(0, 16).replace('T', ' à ') }} (UTC). Les panneaux flottants (Select,
          calendrier, liste d’heures, menus, liste du paginateur, niveaux repliés du fil d’Ariane,
          tooltips, modale, menus de carte et de Task Card) sont audités ouverts, de même que le
          menu latéral replié, une ligne de tableau repliée, une pile d’alertes, une section
          repliée, un contrôle d’inspection replié et un jour d’agenda déplié.
        </p>
        @for (e of a.exceptions ?? []; track e.cible) {
          <p class="gui-body-2">
            <strong>Exception documentée</strong> ({{ e.regle }}, <code>{{ e.cible }}</code>) :
            {{ e.motif }}
          </p>
        }
        <div class="table" role="region" aria-label="Résultats axe-core" tabindex="0">
          <table>
            <thead>
              <tr>
                <th scope="col">Page</th>
                <th scope="col">Clair</th>
                <th scope="col">Sombre</th>
              </tr>
            </thead>
            <tbody>
              @for (p of pagesAxe(); track p.route) {
                <tr>
                  <td>{{ p.titre }}</td>
                  @for (m of [p.clair, p.sombre]; track $index) {
                    <td>
                      @if (m) {
                        @if (m.violations.length === 0) {
                          <span class="gui-status gui-success"
                            >0 violation · {{ m.reussies }} règles réussies</span
                          >
                          @if (m.exceptions?.length) {
                            <span class="gui-caption gui-secondary-text">
                              · {{ m.exceptions!.length }} exception documentée</span
                            >
                          }
                        } @else {
                          <span class="gui-status gui-error"
                            >{{ m.violations.length }} violation(s)</span
                          >
                          <ul class="gui-caption">
                            @for (v of m.violations; track v.id) {
                              <li>
                                {{ v.id }} ({{ v.impact }}, {{ v.noeuds }} élément(s)) :
                                {{ v.aide }}
                              </li>
                            }
                          </ul>
                        }
                      }
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <p class="gui-body-2 gui-secondary-text">{{ messageAxe() }}</p>
      }
    </section>

    <section aria-labelledby="ms-contrastes">
      <h2 class="gui-h6" id="ms-contrastes">Contrastes des jetons</h2>
      <p class="gui-body-2">
        Clair : {{ conformes('clair') }} / {{ total }} paires conformes. Sombre :
        {{ conformes('sombre') }} / {{ total }}. Calcul du {{ CONTRASTES.genere.slice(0, 10) }}.
        Contrôle supplémentaire du mode sombre : fonds atténués trop clairs (Subtle, Tint, fonds de
        Feedback, luminance composée sur Surface au-delà de 0,1) :
        {{ CONTRASTES.fondsClairsSombre.length }}.
      </p>
      <mat-button-toggle-group
        class="gui-sm gui-neutral"
        [value]="vue()"
        (change)="vue.set($event.value)"
        aria-label="Mode affiché"
      >
        <mat-button-toggle value="sombre">Sombre</mat-button-toggle>
        <mat-button-toggle value="clair">Clair (AMF)</mat-button-toggle>
      </mat-button-toggle-group>
      <div class="table" role="region" aria-label="Contrastes" tabindex="0">
        <table>
          <thead>
            <tr>
              <th scope="col">Groupe</th>
              <th scope="col">Usage</th>
              <th scope="col">Couleurs</th>
              <th scope="col">Ratio</th>
              <th scope="col">Seuil</th>
              <th scope="col">APCA Lc</th>
            </tr>
          </thead>
          <tbody>
            @for (m of mesures(); track $index) {
              <tr>
                <td>{{ m.groupe }}</td>
                <td>
                  {{ m.usage }}<br /><span class="gui-caption gui-secondary-text"
                    >{{ m.fg }} sur {{ m.bg }}</span
                  >
                </td>
                <td>
                  @if (m.type === 'texte') {
                    <span class="echantillon" [style.background]="m.arriere" [style.color]="m.avant"
                      >Aa</span
                    >
                  } @else {
                    <span
                      class="echantillon"
                      aria-hidden="true"
                      [style.background]="m.arriere"
                      [style.border-color]="m.avant"
                    ></span>
                  }
                  <span class="gui-caption">{{ m.avant }} / {{ m.arriere }}</span>
                </td>
                <td>
                  <span [class]="'gui-status gui-sm ' + (m.ok ? 'gui-success' : 'gui-error')"
                    >{{ m.ratio.toFixed(2) }}:1</span
                  >
                </td>
                <td>{{ m.seuil }}:1</td>
                <td>{{ m.apca }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .tete {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .tete p,
    section > p {
      margin: 0;
      max-width: 90ch;
    }
    section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    ul {
      margin: 0;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-width: 90ch;
    }
    code {
      font-family: var(--code-police);
      font-size: 13px;
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
    th {
      text-align: left;
      font-weight: 500;
      background: var(--amf-background-surface-subtle);
    }
    th,
    td {
      padding: 8px 12px;
      border-top: 1px solid var(--amf-border-default);
      vertical-align: top;
    }
    .echantillon {
      display: inline-flex;
      width: 40px;
      height: 28px;
      align-items: center;
      justify-content: center;
      border-radius: var(--amf-radius-s);
      border: 2px solid transparent;
      font-weight: 500;
      margin-right: 8px;
      box-sizing: border-box;
    }
  `,
})
export class ModeSombre {
  protected readonly affichage = inject(Affichage);
  protected readonly CONTRASTES = CONTRASTES;
  protected readonly total = CONTRASTES.clair.length;
  protected readonly vue = signal<'clair' | 'sombre'>('sombre');
  protected readonly mesures = computed<MesureContraste[]>(() => CONTRASTES[this.vue()]);
  protected readonly axe = signal<ResultatAxe | null>(null);
  protected readonly messageAxe = signal('Chargement des résultats axe-core…');
  protected readonly pagesAxe = computed(() => {
    const a = this.axe();
    if (!a) return [];
    const routes = [...new Set(a.pages.map((p) => p.route))];
    return routes.map((r) => ({
      route: r,
      titre: a.pages.find((p) => p.route === r)!.titre,
      clair: a.pages.find((p) => p.route === r && p.mode === 'clair'),
      sombre: a.pages.find((p) => p.route === r && p.mode === 'sombre'),
    }));
  });

  constructor() {
    fetch('audit/axe.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => this.axe.set(j))
      .catch(() =>
        this.messageAxe.set('Pas encore de résultat : lancer npm run audit:axe après le build.'),
      );
  }

  protected conformes(mode: 'clair' | 'sombre'): number {
    return CONTRASTES[mode].filter((m) => m.ok).length;
  }

  protected basculer(): void {
    this.affichage.changerMode(this.affichage.mode() === 'dark' ? 'light' : 'dark');
  }
}
