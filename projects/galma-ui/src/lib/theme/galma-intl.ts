import { Injectable } from '@angular/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatStepperIntl } from '@angular/material/stepper';

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

/**
 * Libellés du Paginator en français (« Lignes par page », « 1 à 10 sur 42 », journal du 16/09).
 * MatPaginatorModule ne refournit pas ses libellés : un fournisseur à la racine (provideGalmaMaterial) suffit.
 */
@Injectable()
export class GalmaPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Lignes par page';
  override nextPageLabel = 'Page suivante';
  override previousPageLabel = 'Page précédente';
  override firstPageLabel = 'Première page';
  override lastPageLabel = 'Dernière page';
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 sur ${length}`;
    }
    const debut = page * pageSize;
    const fin = debut < length ? Math.min(debut + pageSize, length) : debut + pageSize;
    return `${debut + 1} à ${fin} sur ${length}`;
  };
}

/** Libellés du Stepper en français (Step : « Optionnel » au Figma). Fournisseur à la racine suffisant. */
@Injectable()
export class GalmaStepperIntl extends MatStepperIntl {
  override optionalLabel = 'Optionnel';
  override completedLabel = 'Terminée';
  override editableLabel = 'Modifiable';
}
