import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil';
import { Couleurs } from './pages/couleurs';
import { Typographie } from './pages/typographie';
import { PageComposantVue } from './pages/composant';
import { ModeSombre } from './pages/mode-sombre';
import { Conformite } from './pages/conformite';

export const routes: Routes = [
  { path: '', component: Accueil, title: 'galma-ui · Installation' },
  { path: 'couleurs', component: Couleurs, title: 'galma-ui · Couleurs' },
  { path: 'typographie', component: Typographie, title: 'galma-ui · Typographie et dimensions' },
  { path: 'composants/:page', component: PageComposantVue, title: 'galma-ui · Composant' },
  { path: 'mode-sombre', component: ModeSombre, title: 'galma-ui · Mode sombre' },
  { path: 'conformite', component: Conformite, title: 'galma-ui · Conformité au journal' },
  { path: '**', redirectTo: '' },
];
