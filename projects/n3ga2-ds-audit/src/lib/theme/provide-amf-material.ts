import {
  DOCUMENT,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
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
import { AmfDatepickerIntl, AmfPaginatorIntl, AmfStepperIntl } from './amf-intl';

/** Options de provideAmfMaterial(). */
export interface AmfMaterialOptions {
  /**
   * Animations Material (ouvertures, transitions, onglets, indicateurs indéterminés). Actives par défaut ; `false`
   * pour les postes sans GPU (bureaux distants RDS) : plus de transition ni d'animation infinie, les indicateurs
   * indéterminés sont figés. La classe `amf-sans-animation` est alors posée sur `<html>` pour les règles CSS du
   * design system (onglets, glisser-déposer).
   */
  animations?: boolean;
  /** Onde (ripple) au clic. Par défaut, suit `animations`. */
  ripple?: boolean;
}

/**
 * Réglages Angular Material du design system AMF.
 *
 * - Animations et ripple actifs par défaut ; `provideAmfMaterial({ animations: false })` les coupe pour les postes
 *   sans GPU (RDS). Sans ripple, le survol et l'appui se lisent à la couleur du conteneur, comme dans le Figma.
 * - Champs : apparence outlined (seule apparence AMF du Form Field), aide sous le champ sans réserver de place.
 * - Toggle Button : pas de coche, la sélection se lit au fond (page 🆕 Toggle Button).
 * - Toggle Switch : pas d'icône dans le curseur (propriété Icon masquée par défaut dans le Figma).
 * - Onglets : indicateur à la largeur de l'onglet, alignés à gauche, sans étirement.
 * - Date Picker : libellés accessibles en français (AmfDatepickerIntl). L'adaptateur de dates et la locale
 *   (MAT_DATE_LOCALE) restent au choix de l'application.
 * - Paginator et Stepper : libellés en français (AmfPaginatorIntl, AmfStepperIntl).
 */
export function provideAmfMaterial(options: AmfMaterialOptions = {}): EnvironmentProviders {
  const animations = options.animations ?? true;
  const ripple = options.ripple ?? animations;
  return makeEnvironmentProviders([
    { provide: MATERIAL_ANIMATIONS, useValue: { animationsDisabled: !animations } },
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: { disabled: !ripple } satisfies RippleGlobalOptions,
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
        ...(animations ? {} : { animationDuration: '0ms' }),
        stretchTabs: false,
        alignTabs: 'start',
      } satisfies MatTabsConfig,
    },
    { provide: MatDatepickerIntl, useClass: AmfDatepickerIntl },
    { provide: MatPaginatorIntl, useClass: AmfPaginatorIntl },
    { provide: MatStepperIntl, useClass: AmfStepperIntl },
    provideEnvironmentInitializer(() => {
      inject(DOCUMENT).documentElement.classList.toggle('amf-sans-animation', !animations);
    }),
  ]);
}
