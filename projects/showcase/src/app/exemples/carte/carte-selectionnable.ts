import { Component, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

/**
 * Selectable Card
 * Carte de choix : contrôle Radio (mat-radio-button) ou Checkbox (mat-checkbox) en en-tête, valeur en
 * Heading H3. Survol Action/Neutral/Subtle, carte choisie bordée 2 px Action/Primary/Default, focus
 * clavier bordé 2 px Border/Focus, carte désactivée en Background/Disabled (aria-disabled sur la
 * carte, états inactifs exemptés du contraste) ; les états sont lus sur le contrôle (:has). Le clic
 * sur la carte est relayé au contrôle par l'application.
 */
@Component({
  selector: 'ex-carte-selectionnable',
  imports: [MatCheckboxModule, MatRadioModule],
  templateUrl: './carte-selectionnable.html',
  styleUrl: './carte-selectionnable.css',
})
export class CarteSelectionnable {
  protected readonly options = [
    {
      id: 'dx51',
      titre: 'Campagne DX51D+Z',
      valeur: '1 234 t',
      description: '62 bobines mères en halle',
      inactif: false,
    },
    {
      id: 's350',
      titre: 'Campagne S350GD+Z',
      valeur: '418 t',
      description: '21 bobines mères en halle',
      inactif: false,
    },
    {
      id: 'dx54',
      titre: 'Campagne DX54D+Z',
      valeur: '0 t',
      description: 'Aucune bobine disponible',
      inactif: true,
    },
  ];
  protected readonly choix = signal('dx51');
  protected readonly export = signal(true);
}
