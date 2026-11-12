import { Injectable } from '@angular/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';

/**
 * Libellés accessibles du Date Picker en français (Material les fournit en anglais).
 *
 * À fournir au niveau du composant qui importe MatDatepickerModule : ce module fournit lui-même ses libellés
 * anglais et masque un fournisseur posé à la racine. provideGalmaMaterial() le pose à la racine pour les
 * applications qui importent les directives une à une (MatDatepicker, MatDatepickerInput, MatDatepickerToggle…).
 *
 * Bouton de période (« NOV. 2026 ») : Material cache le texte affiché aux aides techniques et nomme le bouton
 * par ce libellé (« Choisir le mois et l'année »), la période étant donnée en description. axe-core y relève
 * label-content-name-mismatch (WCAG 2.5.3) : exception documentée dans scripts/audit-axe.mjs.
 */
@Injectable()
export class GalmaDatepickerIntl extends MatDatepickerIntl {
  override calendarLabel = 'Calendrier';
  override openCalendarLabel = 'Ouvrir le calendrier';
  override closeCalendarLabel = 'Fermer le calendrier';
  override prevMonthLabel = 'Mois précédent';
  override nextMonthLabel = 'Mois suivant';
  override prevYearLabel = 'Année précédente';
  override nextYearLabel = 'Année suivante';
  override prevMultiYearLabel = '24 années précédentes';
  override nextMultiYearLabel = '24 années suivantes';
  override switchToMonthViewLabel = 'Choisir la date';
  override switchToMultiYearViewLabel = 'Choisir le mois et l’année';
  override startDateLabel = 'Date de début';
  override endDateLabel = 'Date de fin';
  override comparisonDateLabel = 'Période de comparaison';

  override formatYearRange(start: string, end: string): string {
    return `${start} – ${end}`;
  }

  override formatYearRangeLabel(start: string, end: string): string {
    return `de ${start} à ${end}`;
  }
}
