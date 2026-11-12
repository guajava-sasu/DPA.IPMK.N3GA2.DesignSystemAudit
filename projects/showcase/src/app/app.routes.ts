import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil';
import { Couleurs } from './pages/couleurs';
import { Typographie } from './pages/typographie';
import { PageComposantVue } from './pages/composant';
import { ModeSombre } from './pages/mode-sombre';
import { Conformite } from './pages/conformite';

export const routes: Routes = [
  { path: '', component: Accueil, title: 'amf-design-system · Installation' },
  { path: 'couleurs', component: Couleurs, title: 'amf-design-system · Couleurs' },
  {
    path: 'typographie',
    component: Typographie,
    title: 'amf-design-system · Typographie et dimensions',
  },
  { path: 'composants/:page', component: PageComposantVue, title: 'amf-design-system · Composant' },
  { path: 'mode-sombre', component: ModeSombre, title: 'amf-design-system · Mode sombre' },
  { path: 'conformite', component: Conformite, title: 'amf-design-system · Conformité au journal' },
  { path: '**', redirectTo: '' },
];
