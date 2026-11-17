import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil';
import { Couleurs } from './pages/couleurs';
import { Typographie } from './pages/typographie';
import { PageComposantVue } from './pages/composant';
import { ModeSombre } from './pages/mode-sombre';
import { Conformite } from './pages/conformite';

export const routes: Routes = [
  { path: '', component: Accueil, title: 'n3ga2-ds-audit · Installation' },
  { path: 'couleurs', component: Couleurs, title: 'n3ga2-ds-audit · Couleurs' },
  {
    path: 'typographie',
    component: Typographie,
    title: 'n3ga2-ds-audit · Typographie et dimensions',
  },
  { path: 'composants/:page', component: PageComposantVue, title: 'n3ga2-ds-audit · Composant' },
  { path: 'mode-sombre', component: ModeSombre, title: 'n3ga2-ds-audit · Mode sombre' },
  { path: 'conformite', component: Conformite, title: 'n3ga2-ds-audit · Conformité au journal' },
  { path: '**', redirectTo: '' },
];
