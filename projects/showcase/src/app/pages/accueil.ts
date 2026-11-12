import { Component } from '@angular/core';
import { BlocCode } from '../commun/bloc-code';

@Component({
  selector: 'vt-accueil',
  imports: [BlocCode],
  template: `
    <header class="tete">
      <p class="gui-overline gui-secondary-text">amf-design-system 0.9.0</p>
      <h1 class="gui-h4">Thème AMF v2.0 sur Angular Material</h1>
      <p class="gui-body-1">
        Le design system AMF « officiel » (fichier Figma v2.0) appliqué à Angular Material 22, en
        CSS pur : aucune valeur recopiée à la main, les jetons sont générés depuis le .fig. Chaque
        page de composant montre le rendu, les écarts avec Material, et le code HTML, TypeScript et
        CSS à copier.
      </p>
    </header>

    <section>
      <h2 class="gui-h6">1. Styles globaux</h2>
      <p class="gui-body-2">Dans <code>src/styles.css</code> de l’application :</p>
      <vt-bloc-code langue="css" [code]="styles" />
    </section>
    <section>
      <h2 class="gui-h6">2. Polices et icônes embarquées</h2>
      <p class="gui-body-2">
        Roboto et Material Icons sont servies par l’application (pas de CDN sur les postes RDS).
        Dans <code>angular.json</code>, assets du projet :
      </p>
      <vt-bloc-code langue="json" [code]="assets" />
    </section>
    <section>
      <h2 class="gui-h6">3. Réglages Material</h2>
      <p class="gui-body-2">
        Animations et ripple actifs par défaut, à couper pour les postes sans GPU (bureaux distants
        RDS) ; champs outlined, onglets et toggles aux réglages AMF :
      </p>
      <vt-bloc-code langue="typescript" [code]="config" />
    </section>
    <section>
      <h2 class="gui-h6">4. Mode sombre</h2>
      <p class="gui-body-2">
        AMF n’a pas de mode sombre : amf-design-system en propose un, audité (page Mode sombre). Il
        s’active par la classe <code>dark</code> sur <code>&lt;html&gt;</code> :
      </p>
      <vt-bloc-code langue="typescript" [code]="sombre" />
    </section>
    <section>
      <h2 class="gui-h6">Principes</h2>
      <ul class="gui-body-2">
        <li>
          Les couleurs, rayons, espacements et styles de texte viennent des jetons
          <code>--amf-*</code>, générés par <code>npm run jetons</code> depuis le .fig. On ne
          recopie jamais une valeur.
        </li>
        <li>
          Les composants Material sont habillés par leurs jetons <code>--mat-*</code> ; Badge, Tag,
          Count et Status, sans équivalent Material, sont des classes CSS.
        </li>
        <li>
          Variantes par classes : <code>gui-secondary</code>, <code>gui-neutral</code>,
          <code>gui-destructive</code> ; tailles <code>gui-sm</code> et <code>gui-lg</code>.
        </li>
        <li>
          Mode Rounded du Figma (boutons en pilule) : classe <code>amf-rounded</code> sur un
          conteneur.
        </li>
        <li>
          Partage avec les autres applications AMF : <code>amf-tokens.css</code> et la
          correspondance <code>--mat-sys-*</code> conviennent à Angular Material 19 et plus ; les
          composants amf-design-system (Angular 22) ne se partagent pas.
        </li>
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 32px;
      max-width: 900px;
    }
    .tete {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    p {
      margin: 0;
    }
    ul {
      margin: 0;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    code {
      font-family: var(--code-police);
      font-size: 13px;
    }
  `,
})
export class Accueil {
  protected readonly styles = `@import 'amf-design-system/tokens/amf-theme.css';
/* ou, dans le dépôt AMF-Design-System : @import '../../amf-design-system/tokens/amf-theme.css'; */`;
  protected readonly assets = `"assets": [
  { "glob": "**/*", "input": "node_modules/amf-design-system/assets", "output": "amf" }
]`;
  protected readonly config = `import { ApplicationConfig } from '@angular/core';
import { provideAmfMaterial } from 'amf-design-system';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAmfMaterial(),
    // postes sans GPU (RDS) : provideAmfMaterial({ animations: false })
  ],
};`;
  protected readonly sombre = `import { setAmfThemeMode } from 'amf-design-system';

setAmfThemeMode('dark'); // ou 'light'`;
}
