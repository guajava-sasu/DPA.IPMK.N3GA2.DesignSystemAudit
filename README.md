# AMF-Design-System

Design system AMF v2.0 (fichier Figma « AMF Design System [v2.0].fig ») appliqué à **Angular Material 22**, en **CSS pur**
(ni Sass ni Tailwind). Ce dépôt se limite à la charte graphique : jetons, thème, composants habillés et vitrine.
Les composants propres à une application (états process, synoptique…) vivent dans les dépôts qui le consomment.

- `projects/amf-design-system` : la bibliothèque (paquet `amf-design-system`).
  - `tokens/amf-tokens.css` : jetons AMF **générés** depuis le .fig (`npm run jetons`). Ne jamais modifier à la main.
  - `tokens/amf-material.css` : composants Material habillés AMF (jetons `--mat-*` reliés aux jetons `--amf-*`).
  - `tokens/amf-formulaires.css` : famille formulaire (lot 2) : Textarea, Select, groupes de cases et de radios,
    Slider, Chip, Date Picker, Time Picker, Menu, Button Dropdown, File Upload et File Item.
  - `tokens/amf-navigation.css` : navigation et contenus (lot 3) : Table et Paginator, Pagination, Breadcrumb,
    Title, Stepper, Expansion Panel et Accordion, List, Side Menu.
  - `tokens/amf-messages.css` : messages et overlays (lot 4) : Alert et Alert Stack, Message Info, Disclaimer,
    Empty State, Tooltip (Plain et Rich), Modale (MatDialog), Loader (Progress Bar et Progress Spinner).
  - `tokens/amf-structure.css` : structure et affichage (lot 5) : Avatar, Rating, Scrollbar, Card (Elevated,
    Outlined, survol) et Selectable Card, Header, Footer, Section, Expandable List, Divider Title ; grille de mise en
    page `gui-grid` (12 colonnes, `gui-span-*`).
  - `tokens/amf-metier.css` : composants métier (lot 6) : CTA Bloc, Reorderable List (glisser-déposer du CDK),
    Task Card, Login Panel, Agenda (vue mois), Chat Bubble.
  - `tokens/amf-composants.css` : Badge, Tag, Count, Status (sans équivalent Material), typographie, icônes.
  - `tokens/amf-theme.css` : point d'entrée ; mode sombre (proposition du design system), séries de données, `--mat-sys-*`.
  - `provideAmfMaterial()` : animations et ripple coupés (postes RDS sans GPU), champs outlined, réglages AMF,
    libellés du Date Picker, du Paginator et du Stepper en français (`AmfDatepickerIntl`, `AmfPaginatorIntl`,
    `AmfStepperIntl`).
  - `assets/` : Roboto (OFL) et Material Icons (Apache 2.0) embarquées, logos.
- `projects/showcase` : la vitrine. Une page par composant AMF, code HTML / TypeScript / CSS à copier, couleurs,
  typographie, mode sombre audité, conformité au journal du Figma.

## Commandes

```bash
npm ci
npm start                  # vitrine sur http://localhost:4200
npm run build              # exemples + audit des contrastes (échoue sous les seuils) + vitrine dans dist/showcase
npm run build:lib          # bibliothèque dans dist/amf-design-system
npx ng test amf-design-system --watch=false && npx ng test showcase --watch=false
npm run jetons             # régénère amf-tokens.css depuis ../AMF Design System [v2.0].fig
npm run audit:contrastes   # contrastes WCAG 2.1 (+ APCA indicatif) des jetons, clair et sombre
npm run audit:axe          # axe-core sur la vitrine servie (voir ci-dessous)
```

Audit axe-core : servir `dist/showcase/browser` (par exemple `npx http-server dist/showcase/browser -p 4321`) puis
`npm run audit:axe` ; la première fois, `npx playwright install chromium`. Le résultat s'affiche dans la page Mode
sombre de la vitrine (`projects/showcase/public/audit/axe.json`).

## Utiliser le thème dans une application

```css
/* styles.css */
@import 'amf-design-system/tokens/amf-theme.css';
```

```json
"assets": [{ "glob": "**/*", "input": "node_modules/amf-design-system/assets", "output": "amf" }]
```

```ts
providers: [provideAmfMaterial()];
```

Date Picker et Time Picker : fournir un adaptateur de dates et la locale (`provideNativeDateAdapter()`,
`{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }`). Un composant qui importe `MatDatepickerModule` doit aussi fournir
`{ provide: MatDatepickerIntl, useClass: AmfDatepickerIntl }` : le module remet ses libellés anglais. Saisie clavier
jj/mm/aaaa : l'adaptateur natif ne sait pas la lire, choisir un adaptateur (Luxon, date-fns…) : Inconnu (à confirmer).

Variantes par classes : `gui-secondary`, `gui-neutral`, `gui-destructive` ; tailles `gui-sm`, `gui-lg` ; mode Rounded
AMF : `amf-rounded` sur un conteneur ; mode sombre : `setAmfThemeMode('dark')` (classe `dark` sur `<html>`).

Partage avec les autres applications AMF (Angular 18 ou 20) : `amf-tokens.css` et la correspondance `--mat-sys-*`
conviennent à Material 19 et plus ; Material 18 demanderait un adaptateur Sass. Les composants du design system
(Angular 22) ne se partagent pas.

## Ajouter un exemple à la vitrine

Créer `projects/showcase/src/app/exemples/<page>/<page>-<nom>.{ts,html,css}` : composant autonome, premier commentaire
JSDoc = titre puis description. L'ordre d'affichage suit `ordre.txt` du dossier. `npm run exemples` régénère le catalogue.

Contrôles : [docs/audit-mode-sombre.md](docs/audit-mode-sombre.md), [docs/conformite-journal-figma.md](docs/conformite-journal-figma.md).
