import { Component, computed, input, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Exemple } from '../exemples/catalogue.generated';
import { BlocCode } from './bloc-code';

type Onglet = 'html' | 'ts' | 'css';

/** Un exemple : aperçu vivant puis sources HTML / TypeScript / CSS copiables. */
@Component({
  selector: 'vt-cadre-exemple',
  imports: [NgComponentOutlet, MatButtonToggleModule, BlocCode],
  template: `
    <section class="cadre" [attr.aria-labelledby]="exemple().id + '-titre'">
      <header>
        <h3 class="gui-h6" [id]="exemple().id + '-titre'">{{ exemple().titre }}</h3>
        <p class="gui-body-2 gui-secondary-text">{{ exemple().description }}</p>
      </header>
      <div class="apercu"><ng-container *ngComponentOutlet="exemple().composant" /></div>
      <div class="sources">
        <mat-button-toggle-group
          class="gui-sm gui-neutral"
          [value]="onglet()"
          (change)="onglet.set($event.value)"
          [attr.aria-label]="'Sources de ' + exemple().titre"
        >
          <mat-button-toggle value="html">HTML</mat-button-toggle>
          <mat-button-toggle value="ts">TypeScript</mat-button-toggle>
          <mat-button-toggle value="css">CSS</mat-button-toggle>
        </mat-button-toggle-group>
        <vt-bloc-code [code]="source()" [langue]="nomFichier()" />
      </div>
    </section>
  `,
  styles: `
    .cadre {
      border: 1px solid var(--amf-border-strong);
      border-radius: var(--amf-radius-l);
      background: var(--amf-background-surface);
      overflow: hidden;
    }
    header {
      padding: 16px 16px 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    header p {
      margin: 0;
      max-width: 80ch;
    }
    .apercu {
      padding: 24px 16px;
    }
    .sources {
      padding: 12px 16px 16px;
      border-top: 1px solid var(--amf-border-default);
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--amf-background-page);
    }
  `,
})
export class CadreExemple {
  readonly exemple = input.required<Exemple>();
  protected readonly onglet = signal<Onglet>('html');
  protected readonly source = computed(() => this.exemple()[this.onglet()]);
  protected readonly nomFichier = computed(() => `${this.exemple().id}.${this.onglet()}`);
}
