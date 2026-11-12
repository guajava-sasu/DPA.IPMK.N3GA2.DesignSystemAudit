import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Menu latéral déplié et replié
 * Side Menu Layout=Expanded (240 px) et Collapsed (64 px, classe gui-collapsed) : lien retour «
 * Accueil » en Form Label Foreground/Link, bouton de repli 40, items L de 48 px, item actif en pilule
 * Primary (aria-current="page"), Count Grey, icône de fin chevron_right, item désactivé, réglages
 * groupés en bas. Replié, les libellés restent lus par les aides techniques et le Count passe en haut
 * à droite de l'icône.
 */
@Component({
  selector: 'ex-menu-lateral-deplie',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './menu-lateral-deplie.html',
  styleUrl: './menu-lateral-deplie.css',
})
export class MenuLateralDeplie {
  protected readonly replie = signal(false);
  protected readonly active = signal('Synoptique');
  protected readonly rubriques = [
    { icone: 'dashboard', libelle: 'Synoptique', compte: 0, sousMenu: false, inactive: false },
    { icone: 'inventory_2', libelle: 'Bobines', compte: 3, sousMenu: true, inactive: false },
    { icone: 'report', libelle: 'Défauts', compte: 12, sousMenu: false, inactive: false },
    { icone: 'tune', libelle: 'Presets', compte: 0, sousMenu: true, inactive: false },
    { icone: 'insights', libelle: 'Productivité', compte: 0, sousMenu: false, inactive: true },
  ];
}
