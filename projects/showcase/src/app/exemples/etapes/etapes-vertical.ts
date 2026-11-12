import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

/**
 * Stepper vertical et erreur
 * Stepper Orientation=Vertical : corps de chaque étape à droite d'une colonne de liaison de 24 px.
 * Step State=Error : indicateur Feedback/Error/Solid et libellé en Feedback/Error/Foreground, avec le
 * message d'erreur sous le libellé (STEPPER_GLOBAL_OPTIONS showError).
 */
@Component({
  selector: 'ex-etapes-vertical',
  imports: [MatStepperModule, MatButtonModule, MatIconModule],
  templateUrl: './etapes-vertical.html',
  styleUrl: './etapes-vertical.css',
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }],
})
export class EtapesVertical {}
