import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Affichage } from './commun/affichage';
import { FAMILLES, Famille, PAGES } from './pages/pages';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonToggleModule],
  template: `
    <a class="evitement" href="#contenu" (click)="allerAuContenu($event)">Aller au contenu</a>
    <header class="barre">
      <img
        [src]="
          affichage.mode() === 'dark' ? 'amf/logos/logo-white.svg' : 'amf/logos/logo-primary.svg'
        "
        alt=""
        class="logo"
      />
      <div class="marque">
        <span class="gui-subtitle-1">amf-design-system</span>
        <span class="gui-caption gui-secondary-text"
          >Design system AMF v2.0 · Angular Material 22</span
        >
      </div>
      <div class="reglages">
        <mat-button-toggle-group
          class="gui-sm gui-neutral"
          [value]="affichage.mode()"
          (change)="affichage.changerMode($event.value)"
          aria-label="Mode d'affichage"
        >
          <mat-button-toggle value="light">Clair</mat-button-toggle>
          <mat-button-toggle value="dark">Sombre</mat-button-toggle>
        </mat-button-toggle-group>
        <mat-button-toggle-group
          class="gui-sm gui-neutral"
          [value]="affichage.arrondi()"
          (change)="affichage.changerArrondi($event.value)"
          aria-label="Rayon des boutons (mode AMF)"
        >
          <mat-button-toggle [value]="false">Default</mat-button-toggle>
          <mat-button-toggle [value]="true">Rounded</mat-button-toggle>
        </mat-button-toggle-group>
      </div>
    </header>
    <div class="corps">
      <nav aria-label="Pages de la vitrine">
        <p class="gui-overline gui-secondary-text">Démarrer</p>
        <a routerLink="/" routerLinkActive="actif" [routerLinkActiveOptions]="{ exact: true }"
          >Installation</a
        >
        <p class="gui-overline gui-secondary-text">Fondations</p>
        <a routerLink="/couleurs" routerLinkActive="actif">Couleurs</a>
        <a routerLink="/typographie" routerLinkActive="actif">Typographie et dimensions</a>
        @for (f of familles; track f) {
          <p class="gui-overline gui-secondary-text">{{ f }}</p>
          @for (p of pagesDe(f); track p.id) {
            <a [routerLink]="['/composants', p.id]" routerLinkActive="actif">{{ p.titre }}</a>
          }
        }
        <p class="gui-overline gui-secondary-text">Contrôles</p>
        <a routerLink="/mode-sombre" routerLinkActive="actif">Mode sombre audité</a>
        <a routerLink="/conformite" routerLinkActive="actif">Conformité au journal</a>
      </nav>
      <main id="contenu" tabindex="-1"><router-outlet /></main>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background: var(--amf-background-page);
      color: var(--amf-foreground-primary);
    }
    .evitement {
      position: absolute;
      left: -9999px;
      top: 8px;
      z-index: 10;
      padding: 8px 12px;
      background: var(--amf-background-surface);
      color: var(--amf-foreground-link);
      border-radius: var(--amf-radius-m);
    }
    .evitement:focus {
      left: 8px;
    }
    .barre {
      position: sticky;
      top: 0;
      z-index: 5;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 8px 24px;
      min-height: 64px;
      box-sizing: border-box;
      background: var(--amf-background-surface);
      border-bottom: 1px solid var(--amf-border-default);
    }
    .logo {
      height: 28px;
    }
    .marque {
      display: flex;
      flex-direction: column;
    }
    .reglages {
      margin-left: auto;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .corps {
      display: grid;
      grid-template-columns: 240px minmax(0, 1fr);
    }
    nav {
      position: sticky;
      top: 64px;
      align-self: start;
      height: calc(100vh - 64px);
      overflow-y: auto;
      box-sizing: border-box;
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      border-right: 1px solid var(--amf-border-default);
      background: var(--amf-background-surface);
    }
    nav p {
      margin: 16px 12px 4px;
    }
    nav p:first-child {
      margin-top: 0;
    }
    nav a {
      display: block;
      padding: 8px 12px;
      border-radius: var(--amf-radius-m);
      color: var(--amf-foreground-primary);
      text-decoration: none;
      font: var(--amf-text-body-2-weight) var(--amf-text-body-2-size) /
        var(--amf-text-body-2-line-height) var(--gui-font);
    }
    nav a:hover {
      background: var(--amf-action-neutral-subtle);
    }
    nav a:focus-visible {
      outline: 2px solid var(--amf-border-focus);
      outline-offset: -2px;
    }
    nav a.actif {
      background: var(--amf-action-primary-default);
      color: var(--amf-foreground-on-primary);
      font-weight: 500;
    }
    main {
      padding: 32px;
      min-width: 0;
      outline: none;
    }
    @media (max-width: 800px) {
      .corps {
        grid-template-columns: 1fr;
      }
      nav {
        position: static;
        height: auto;
        border-right: none;
        border-bottom: 1px solid var(--amf-border-default);
      }
      main {
        padding: 16px;
      }
    }
  `,
})
export class App {
  protected readonly affichage = inject(Affichage);
  protected readonly familles = FAMILLES;
  protected pagesDe(f: Famille) {
    return PAGES.filter((p) => p.famille === f);
  }

  protected allerAuContenu(e: Event): void {
    e.preventDefault();
    document.getElementById('contenu')?.focus();
  }
}
