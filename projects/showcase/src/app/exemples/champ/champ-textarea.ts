import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

/**
 * Zone de texte (Textarea)
 * Form Field Type=Textarea (journal du 29/09) : hauteur minimale 96 px, poignée de redimensionnement
 * verticale, compteur en Caption à droite. Pour une zone sans poignée : classe gui-no-resize sur le
 * textarea.
 */
@Component({
  selector: 'ex-champ-textarea',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './champ-textarea.html',
  styleUrl: './champ-textarea.css',
})
export class ChampTextarea {
  protected readonly motif = new FormControl('', Validators.required);

  constructor() {
    this.motif.markAsTouched();
  }
}
