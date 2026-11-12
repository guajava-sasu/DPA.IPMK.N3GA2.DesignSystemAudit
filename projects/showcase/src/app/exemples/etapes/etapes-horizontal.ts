import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Stepper horizontal
 * Stepper Orientation=Horizontal : étapes de 24 px reliées par un trait Border/Default, active et
 * terminées en Primary (coche 16 px via matStepperIcon), à venir en Feedback/Neutral/Solid ; contenu
 * puis actions « Continuer » (Filled) et « Précédent » (Text). Étape facultative : libellé « Optionnel
 * » en Caption (GalmaStepperIntl).
 */
@Component({
  selector: 'ex-etapes-horizontal',
  imports: [MatStepperModule, MatButtonModule, MatIconModule],
  templateUrl: './etapes-horizontal.html',
  styleUrl: './etapes-horizontal.css',
})
export class EtapesHorizontal {}
