import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import {
  MATERIAL_ANIMATIONS,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from '@angular/material/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import {
  MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS,
  MatButtonToggleDefaultOptions,
} from '@angular/material/button-toggle';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS } from '@angular/material/slide-toggle';
import { MAT_TABS_CONFIG, MatTabsConfig } from '@angular/material/tabs';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatStepperIntl } from '@angular/material/stepper';
import { GalmaDatepickerIntl, GalmaPaginatorIntl, GalmaStepperIntl } from './galma-intl';

/**
 * Réglages Angular Material du design system AMF pour Galma2.
 *
 * - Animations et ripple coupés : postes RDS sans GPU (ADR 2026-11-05) ; AMF change la couleur au survol, sans onde.
 * - Champs : apparence outlined (seule apparence AMF du Form Field), aide sous le champ sans réserver de place.
 * - Toggle Button : pas de coche, la sélection se lit au fond (page 🆕 Toggle Button).
 * - Toggle Switch : pas d'icône dans le curseur (propriété Icon masquée par défaut dans le Figma).
 * - Onglets : indicateur à la largeur de l'onglet, alignés à gauche, sans étirement.
 * - Date Picker : libellés accessibles en français (GalmaDatepickerIntl). L'adaptateur de dates et la locale
 *   (MAT_DATE_LOCALE) restent au choix de l'application.
 * - Paginator et Stepper : libellés en français (GalmaPaginatorIntl, GalmaStepperIntl).
 */
export function provideGalmaMaterial(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: MATERIAL_ANIMATIONS, useValue: { animationsDisabled: true } },
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: { disabled: true } satisfies RippleGlobalOptions,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic',
        floatLabel: 'auto',
      } satisfies MatFormFieldDefaultOptions,
    },
    {
      provide: MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS,
      useValue: {
        hideSingleSelectionIndicator: true,
        hideMultipleSelectionIndicator: true,
      } satisfies MatButtonToggleDefaultOptions,
    },
    { provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, useValue: { hideIcon: true } },
    {
      provide: MAT_TABS_CONFIG,
      useValue: {
        animationDuration: '0ms',
        stretchTabs: false,
        alignTabs: 'start',
      } satisfies MatTabsConfig,
    },
    { provide: MatDatepickerIntl, useClass: GalmaDatepickerIntl },
    { provide: MatPaginatorIntl, useClass: GalmaPaginatorIntl },
    { provide: MatStepperIntl, useClass: GalmaStepperIntl },
  ]);
}
