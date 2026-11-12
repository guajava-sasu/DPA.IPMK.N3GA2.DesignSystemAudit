import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { EXEMPLES } from '../exemples/catalogue.generated';
import { CadreExemple } from '../commun/cadre-exemple';
import { BlocCode } from '../commun/bloc-code';
import { PAGES } from './pages';

@Component({
  selector: 'vt-page-composant',
  imports: [CadreExemple, BlocCode],
  template: `
    @if (page(); as p) {
      <header class="tete">
        <p class="gui-overline gui-secondary-text">Composant</p>
        <h1 class="gui-h4">{{ p.titre }}</h1>
        <p class="gui-body-1">{{ p.resume }}</p>
        <p class="gui-caption gui-secondary-text">Figma AMF v2.0 : page {{ p.figma }}</p>
      </header>
      @if (p.material) {
        <section class="bloc">
          <h2 class="gui-subtitle-1">Import</h2>
          <vt-bloc-code [code]="p.material" langue="typescript" />
        </section>
      }
      @if (p.ecarts?.length) {
        <section class="bloc ecarts" aria-labelledby="ecarts">
          <h2 class="gui-subtitle-1" id="ecarts">Écarts entre Material et le Figma</h2>
          <ul class="gui-body-2">
            @for (e of p.ecarts; track e) {
              <li>{{ e }}</li>
            }
          </ul>
        </section>
      }
      <div class="exemples">
        @for (e of exemples(); track e.id) {
          <vt-cadre-exemple [exemple]="e" />
        }
      </div>
    } @else {
      <p>Page inconnue.</p>
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
    .bloc {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ecarts ul {
      margin: 0;
      padding-left: 20px;
      max-width: 90ch;
    }
    .exemples {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  `,
})
export class PageComposantVue {
  private readonly id = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('page') ?? '')),
    { initialValue: '' },
  );
  protected readonly page = computed(() => PAGES.find((p) => p.id === this.id()));
  protected readonly exemples = computed(() => EXEMPLES.filter((e) => e.page === this.id()));
}
