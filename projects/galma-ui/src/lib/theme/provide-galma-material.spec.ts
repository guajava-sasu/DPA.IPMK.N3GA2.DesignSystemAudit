import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { MATERIAL_ANIMATIONS, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideGalmaMaterial } from './provide-galma-material';

describe('provideGalmaMaterial', () => {
  it('coupe animations et ripple et règle les champs en outlined (RDS, AMF)', () => {
    TestBed.configureTestingModule({ providers: [provideGalmaMaterial()] });
    expect(TestBed.inject(MATERIAL_ANIMATIONS).animationsDisabled).toBe(true);
    expect(TestBed.inject(MAT_RIPPLE_GLOBAL_OPTIONS).disabled).toBe(true);
    expect(TestBed.inject(MAT_FORM_FIELD_DEFAULT_OPTIONS).appearance).toBe('outline');
  });
});
