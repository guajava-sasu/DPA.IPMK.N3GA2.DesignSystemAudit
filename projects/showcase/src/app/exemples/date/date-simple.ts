import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { GalmaDatepickerIntl } from 'galma-ui';

/**
 * Date
 * mat-datepicker : champ saisissable et calendrier de 312 px (journal du 22/09). Jour choisi en
 * Primary plein, aujourd'hui cerclé Border/Input. Fournir un adaptateur de dates et la locale fr-FR
 * (lundi en premier jour).
 */
@Component({
  selector: 'ex-date-simple',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './date-simple.html',
  styleUrl: './date-simple.css',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    // MatDatepickerModule fournit ses libellés anglais : les remplacer au niveau du composant
    { provide: MatDatepickerIntl, useClass: GalmaDatepickerIntl },
  ],
})
export class DateSimple {}
