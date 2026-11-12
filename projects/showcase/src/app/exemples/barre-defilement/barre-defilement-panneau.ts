import { Component } from '@angular/core';

/**
 * Panneau défilant
 * Classe gui-scrollbar sur le conteneur défilant : gouttière de 12, piste 8 en Surface Subtle, curseur
 * Foreground/Secondary (5,0:1 sur la piste), Radius/M. Comme dans l'exemple de conception du Figma, la
 * liste n'a pas de bordure propre dans le panneau. Le panneau défilant est atteignable au clavier
 * (tabindex="0").
 */
@Component({
  selector: 'ex-barre-defilement-panneau',
  imports: [],
  templateUrl: './barre-defilement-panneau.html',
  styleUrl: './barre-defilement-panneau.css',
})
export class BarreDefilementPanneau {
  protected readonly bobines = Array.from({ length: 24 }, (_, i) => 2611201 + i);
}
