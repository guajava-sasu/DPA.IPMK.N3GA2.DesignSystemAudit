import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

/**
 * Heure
 * mat-timepicker (journal du 24/09) : champ HH:MM saisissable et liste d'heures dans un panneau, au
 * pas de 30 minutes ici (interval). L'horloge v1, jugée inaccessible, n'est pas reprise.
 */
@Component({
  selector: 'ex-heure-simple',
  imports: [MatFormFieldModule, MatInputModule, MatTimepickerModule],
  templateUrl: './heure-simple.html',
  styleUrl: './heure-simple.css',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
})
export class HeureSimple {
  protected readonly debut = new Date(2026, 10, 12, 6, 0);
}
