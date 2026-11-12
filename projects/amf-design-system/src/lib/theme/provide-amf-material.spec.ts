import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { MATERIAL_ANIMATIONS, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatStepperIntl } from '@angular/material/stepper';
import { provideAmfMaterial } from './provide-amf-material';

describe('provideAmfMaterial', () => {
  it('garde animations et ripple par défaut et règle les champs en outlined', () => {
    TestBed.configureTestingModule({ providers: [provideAmfMaterial()] });
    expect(TestBed.inject(MATERIAL_ANIMATIONS).animationsDisabled).toBe(false);
    expect(TestBed.inject(MAT_RIPPLE_GLOBAL_OPTIONS).disabled).toBe(false);
    expect(TestBed.inject(MAT_TABS_CONFIG).animationDuration).toBeUndefined();
    expect(document.documentElement.classList.contains('amf-sans-animation')).toBe(false);
    expect(TestBed.inject(MAT_FORM_FIELD_DEFAULT_OPTIONS).appearance).toBe('outline');
  });

  it('coupe animations et ripple avec animations: false (postes RDS sans GPU)', () => {
    TestBed.configureTestingModule({ providers: [provideAmfMaterial({ animations: false })] });
    expect(TestBed.inject(MATERIAL_ANIMATIONS).animationsDisabled).toBe(true);
    expect(TestBed.inject(MAT_RIPPLE_GLOBAL_OPTIONS).disabled).toBe(true);
    expect(TestBed.inject(MAT_TABS_CONFIG).animationDuration).toBe('0ms');
    expect(document.documentElement.classList.contains('amf-sans-animation')).toBe(true);
  });

  it('règle le ripple indépendamment des animations', () => {
    TestBed.configureTestingModule({
      providers: [provideAmfMaterial({ animations: false, ripple: true })],
    });
    expect(TestBed.inject(MATERIAL_ANIMATIONS).animationsDisabled).toBe(true);
    expect(TestBed.inject(MAT_RIPPLE_GLOBAL_OPTIONS).disabled).toBe(false);
  });

  it('fournit les libellés du Date Picker en français', () => {
    TestBed.configureTestingModule({ providers: [provideAmfMaterial()] });
    const intl = TestBed.inject(MatDatepickerIntl);
    expect(intl.openCalendarLabel).toBe('Ouvrir le calendrier');
    expect(intl.switchToMultiYearViewLabel).toBe('Choisir le mois et l’année');
  });

  it('fournit les libellés du Paginator et du Stepper en français', () => {
    TestBed.configureTestingModule({ providers: [provideAmfMaterial()] });
    const pagination = TestBed.inject(MatPaginatorIntl);
    expect(pagination.itemsPerPageLabel).toBe('Lignes par page');
    expect(pagination.getRangeLabel(0, 10, 42)).toBe('1 à 10 sur 42');
    expect(pagination.getRangeLabel(4, 10, 42)).toBe('41 à 42 sur 42');
    expect(TestBed.inject(MatStepperIntl).optionalLabel).toBe('Optionnel');
  });
});
