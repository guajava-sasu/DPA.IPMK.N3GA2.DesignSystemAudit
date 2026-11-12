import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

/**
 * Erreur et désactivé
 * Mêmes états que le Form Field : bordure Border/Error 2 px et message, ou fond Background/Disabled.
 */
@Component({
  selector: 'ex-select-etats',
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './select-etats.html',
  styleUrl: './select-etats.css',
})
export class SelectEtats {
  protected readonly destination = new FormControl('', Validators.required);

  constructor() {
    this.destination.markAsTouched();
  }
}
