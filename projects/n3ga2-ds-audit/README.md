# n3ga2-ds-audit

Bibliothèque du design system AMF v2.0 sur Angular Material 22, en CSS pur (ni Sass ni Tailwind) : jetons, thème
Material, composants habillés par classes `gui-*`.

## Utiliser le thème dans une application

```css
/* styles.css */
@import 'n3ga2-ds-audit/tokens/amf-theme.css';
```

```json
"assets": [{ "glob": "**/*", "input": "node_modules/n3ga2-ds-audit/assets", "output": "amf" }]
```

```ts
providers: [provideAmfMaterial()];
```

Variantes par classes : `gui-secondary`, `gui-neutral`, `gui-destructive` ; tailles `gui-sm`, `gui-lg` ; mode Rounded
AMF : `amf-rounded` sur un conteneur ; mode sombre : `setAmfThemeMode('dark')` (classe `dark` sur `<html>`).

Date Picker et Time Picker : fournir un adaptateur de dates et la locale (`provideNativeDateAdapter()`,
`{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }`), et `{ provide: MatDatepickerIntl, useClass: AmfDatepickerIntl }`
dans un composant qui importe `MatDatepickerModule`.

## Développer

Le mode d'emploi complet, la vitrine et la liste des fichiers sont dans le README à la racine du dépôt
n3ga2-ds-audit.

```bash
ng build n3ga2-ds-audit                         # paquet dans dist/n3ga2-ds-audit
npx ng test n3ga2-ds-audit --watch=false        # tests unitaires (Vitest)
```
