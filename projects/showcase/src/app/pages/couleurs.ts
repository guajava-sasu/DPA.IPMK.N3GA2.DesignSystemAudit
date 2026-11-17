import { Component, computed, inject } from '@angular/core';
import { Affichage } from '../commun/affichage';

const GROUPES: { titre: string; prefixe: string; noms: string[] }[] = [
  {
    titre: 'Background',
    prefixe: '--amf-background-',
    noms: ['page', 'surface', 'surface-subtle', 'disabled', 'inverse', 'overlay'],
  },
  {
    titre: 'Foreground',
    prefixe: '--amf-foreground-',
    noms: [
      'primary',
      'secondary',
      'placeholder',
      'disabled',
      'brand',
      'link',
      'on-primary',
      'inverse',
    ],
  },
  {
    titre: 'Border',
    prefixe: '--amf-border-',
    noms: ['subtle', 'default', 'strong', 'input', 'input-hover', 'focus', 'error', 'disabled'],
  },
  ...['primary', 'secondary', 'neutral', 'error'].map((c) => ({
    titre: `Action / ${c[0].toUpperCase()}${c.slice(1)}`,
    prefixe: `--amf-action-${c}-`,
    noms: [
      'default',
      'hover',
      'pressed',
      'subtle',
      'subtle-hover',
      'foreground',
      ...(c === 'primary' || c === 'secondary' ? ['tint', 'on-tint'] : []),
    ],
  })),
  {
    titre: 'Action / Disabled',
    prefixe: '--amf-action-disabled-',
    noms: ['background', 'foreground', 'border'],
  },
  ...['info', 'success', 'warning', 'error', 'neutral'].map((t) => ({
    titre: `Feedback / ${t[0].toUpperCase()}${t.slice(1)}`,
    prefixe: `--amf-feedback-${t}-`,
    noms: ['background', 'foreground', 'solid', 'on-solid'],
  })),
  ...['orange', 'blue', 'green', 'navy', 'purple', 'grey'].map((a) => ({
    titre: `Accent / ${a[0].toUpperCase()}${a.slice(1)}`,
    prefixe: `--amf-accent-${a}-`,
    noms: ['subtle', 'on-subtle', 'strong', 'on-strong'],
  })),
];

@Component({
  selector: 'vt-couleurs',
  template: `
    <header class="tete">
      <p class="gui-overline gui-secondary-text">Fondations</p>
      <h1 class="gui-h4">Couleurs sémantiques</h1>
      <p class="gui-body-1">
        Jetons AMF Semantic, alias des primitives (collection AMF Primitives). En mode sombre, les
        valeurs sont celles de la proposition n3ga2-ds-audit. Valeurs lues dans la page :
        {{ mode() === 'dark' ? 'mode sombre' : 'mode clair' }}.
      </p>
    </header>
    @for (g of groupes(); track g.titre) {
      <section [attr.aria-label]="g.titre">
        <h2 class="gui-subtitle-1">{{ g.titre }}</h2>
        <ul class="nuancier">
          @for (j of g.jetons; track j.nom) {
            <li>
              <span class="pastille" [style.background]="'var(' + j.nom + ')'"></span>
              <span class="gui-caption-medium nom">{{ j.nom }}</span>
              <span class="gui-caption gui-secondary-text">{{ j.valeur }}</span>
            </li>
          }
        </ul>
      </section>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 24px;
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
    section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .nuancier {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 8px;
    }
    li {
      display: grid;
      grid-template-columns: 40px 1fr;
      grid-template-rows: auto auto;
      column-gap: 12px;
      align-items: center;
      padding: 8px;
      border: 1px solid var(--amf-border-default);
      border-radius: var(--amf-radius-m);
      background: var(--amf-background-surface);
    }
    .pastille {
      grid-row: span 2;
      width: 40px;
      height: 40px;
      border-radius: var(--amf-radius-s);
      border: 1px solid var(--amf-border-default);
      box-sizing: border-box;
    }
    .nom {
      word-break: break-all;
    }
  `,
})
export class Couleurs {
  protected readonly mode = inject(Affichage).mode;
  protected readonly groupes = computed(() => {
    this.mode();
    const style = getComputedStyle(document.documentElement);
    return GROUPES.map((g) => ({
      titre: g.titre,
      jetons: g.noms.map((n) => ({
        nom: g.prefixe + n,
        valeur: style.getPropertyValue(g.prefixe + n).trim(),
      })),
    }));
  });
}
