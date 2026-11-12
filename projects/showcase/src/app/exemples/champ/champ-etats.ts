import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Erreur, désactivé, lecture seule
 * Erreur : bordure Border/Error 2 px et message Feedback/Error. Désactivé : Background/Disabled.
 * Lecture seule : classe gui-readonly (Surface Subtle, Border/Default).
 */
@Component({
  selector: 'ex-champ-etats',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './champ-etats.html',
  styleUrl: './champ-etats.css',
})
export class ChampEtats {
  protected readonly poids = new FormControl('', Validators.required);

  constructor() {
    this.poids.markAsTouched();
  }
}
