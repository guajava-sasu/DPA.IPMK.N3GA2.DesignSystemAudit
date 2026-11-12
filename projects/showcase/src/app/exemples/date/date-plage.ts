import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { AmfDatepickerIntl } from 'amf-design-system';

/**
 * Plage de dates
 * mat-date-range-input et mat-date-range-picker : début et fin en Primary plein, jours compris en
 * Primary Tint (Calendar Cell In Range).
 */
@Component({
  selector: 'ex-date-plage',
  imports: [MatFormFieldModule, MatDatepickerModule],
  templateUrl: './date-plage.html',
  styleUrl: './date-plage.css',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    // MatDatepickerModule fournit ses libellés anglais : les remplacer au niveau du composant
    { provide: MatDatepickerIntl, useClass: AmfDatepickerIntl },
  ],
})
export class DatePlage {}
