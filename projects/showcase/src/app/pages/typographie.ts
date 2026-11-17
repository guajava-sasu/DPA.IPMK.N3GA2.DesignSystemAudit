import { Component, computed, inject } from '@angular/core';
import { Affichage } from '../commun/affichage';

const STYLES = [
  ['gui-h1', 'heading-h1', 'Heading H1'],
  ['gui-h2', 'heading-h2', 'Heading H2'],
  ['gui-h3', 'heading-h3', 'Heading H3'],
  ['gui-h4', 'heading-h4', 'Heading H4'],
  ['gui-h5', 'heading-h5', 'Heading H5'],
  ['gui-h6', 'heading-h6', 'Heading H6'],
  ['gui-subtitle-1', 'subtitle-1', 'Subtitle 1'],
  ['gui-subtitle-2', 'subtitle-2', 'Subtitle 2'],
  ['gui-body-1', 'body-1', 'Body 1'],
  ['gui-body-1-medium', 'body-1-medium', 'Body 1 Medium'],
  ['gui-body-2', 'body-2', 'Body 2'],
  ['gui-form-label', 'form-label', 'Form Label'],
  ['gui-caption', 'caption', 'Caption'],
  ['gui-caption-medium', 'caption-medium', 'Caption Medium'],
  ['gui-overline', 'overline', 'Overline'],
];

@Component({
  selector: 'vt-typographie',
  template: `
    <header class="tete">
      <p class="gui-overline gui-secondary-text">Fondations</p>
      <h1 class="gui-h4">Typographie et dimensions</h1>
      <p class="gui-body-1">
        Gilroy Regular pour le corps et SemiBold pour les titres. Styles de texte exposés en classes
        <code>gui-*</code> et en jetons <code>--amf-text-*</code>.
      </p>
    </header>
    <section aria-labelledby="t-styles">
      <h2 class="gui-h6" id="t-styles">Styles de texte</h2>
      <div class="styles">
        @for (s of styles(); track s.classe) {
          <div class="ligne">
            <span [class]="s.classe">{{ s.titre }} · Ligne de galvanisation</span>
            <span class="gui-caption gui-secondary-text">.{{ s.classe }} — {{ s.mesure }}</span>
          </div>
        }
      </div>
    </section>
    <section aria-labelledby="t-rayons">
      <h2 class="gui-h6" id="t-rayons">Rayons</h2>
      <div class="rangee">
        @for (r of rayons; track r) {
          <div class="carre" [style.border-radius]="'var(--amf-radius-' + r + ')'">
            <span class="gui-caption">{{ r }}</span
            ><span class="gui-caption gui-secondary-text">{{ valeur('--amf-radius-' + r) }}</span>
          </div>
        }
        <div class="carre" style="border-radius: var(--amf-radius-button)">
          <span class="gui-caption">button</span
          ><span class="gui-caption gui-secondary-text">{{ valeur('--amf-radius-button') }}</span>
        </div>
      </div>
    </section>
    <section aria-labelledby="t-esp">
      <h2 class="gui-h6" id="t-esp">Espacements</h2>
      <div class="espaces">
        @for (e of espacements; track e) {
          <div class="esp">
            <span class="barre" [style.width]="'var(--amf-spacing-' + e + ')'"></span
            ><span class="gui-caption">--amf-spacing-{{ e }}</span>
          </div>
        }
      </div>
    </section>
    <section aria-labelledby="t-ombres">
      <h2 class="gui-h6" id="t-ombres">Ombres (Dropshadow)</h2>
      <p class="gui-body-2 gui-secondary-text">
        AMF élève les cartes par la bordure Border/Strong ; les ombres restent pour les surfaces
        flottantes (menus, dialogues).
      </p>
      <div class="rangee">
        @for (o of ombres; track o) {
          <div class="carre ombre" [style.box-shadow]="'var(--amf-shadow-' + o + ')'">
            <span class="gui-caption">{{ o }}</span>
          </div>
        }
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
    }
    section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .styles {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .ligne {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--amf-border-subtle);
    }
    .rangee {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    .carre {
      width: 88px;
      height: 88px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--amf-border-strong);
      background: var(--amf-background-surface);
      box-sizing: border-box;
    }
    .ombre {
      border: none;
      border-radius: var(--amf-radius-m);
    }
    .espaces {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .esp {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .barre {
      height: 12px;
      background: var(--amf-action-secondary-default);
      min-width: 1px;
    }
    code {
      font-family: var(--code-police);
      font-size: 13px;
    }
  `,
})
export class Typographie {
  private readonly mode = inject(Affichage).mode;
  protected readonly rayons = ['xs', 's', 'm', 'l', 'full'];
  protected readonly espacements = ['2', '4', '8', '12', '16', '24', '32', '48', '64'];
  protected readonly ombres = ['lv1', 'lv2', 'lv3', 'lv4'];
  protected readonly styles = computed(() => {
    const st = getComputedStyle(document.documentElement);
    return STYLES.map(([classe, jeton, titre]) => {
      const v = (k: string) => st.getPropertyValue(`--amf-text-${jeton}-${k}`).trim();
      return {
        classe,
        titre,
        mesure: `${v('size')} / ${v('line-height')}, graisse ${v('weight')}, approche ${v('letter-spacing')}${v('transform') ? ', ' + v('transform') : ''}`,
      };
    });
  });
  protected valeur(nom: string): string {
    this.mode();
    return getComputedStyle(document.documentElement).getPropertyValue(nom).trim();
  }
}
