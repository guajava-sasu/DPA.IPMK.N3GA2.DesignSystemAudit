import { Component } from '@angular/core';

/**
 * Tailles L, M et S
 * Side Menu Item Size=L (48 px, icône 24, par défaut), M (40 px, icône 20, classe gui-md) et S (32 px,
 * icône 20, libellé Caption, classe gui-sm), journal du 28/09.
 */
@Component({
  selector: 'ex-menu-lateral-tailles',
  imports: [],
  templateUrl: './menu-lateral-tailles.html',
  styleUrl: './menu-lateral-tailles.css',
})
export class MenuLateralTailles {
  protected readonly tailles = [
    { nom: 'L', classe: 'gui-side-menu' },
    { nom: 'M', classe: 'gui-side-menu gui-md' },
    { nom: 'S', classe: 'gui-side-menu gui-sm' },
  ];
}
