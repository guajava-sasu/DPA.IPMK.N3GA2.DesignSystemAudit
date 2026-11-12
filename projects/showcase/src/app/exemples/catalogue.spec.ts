import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideGalmaMaterial } from 'galma-ui';
import { EXEMPLES } from './catalogue.generated';
import { PAGES } from '../pages/pages';

describe('catalogue des exemples', () => {
  it('chaque page composant a au moins un exemple, chaque exemple une page', () => {
    for (const p of PAGES)
      expect(
        EXEMPLES.some((e) => e.page === p.id),
        p.id,
      ).toBe(true);
    for (const e of EXEMPLES)
      expect(
        PAGES.some((p) => p.id === e.page),
        e.id,
      ).toBe(true);
  });

  for (const e of EXEMPLES) {
    it(`${e.id} se rend et montre ses trois sources`, async () => {
      TestBed.configureTestingModule({ providers: [provideGalmaMaterial()] });
      const f = TestBed.createComponent(e.composant);
      f.detectChanges();
      await f.whenStable();
      expect((f.nativeElement as HTMLElement).innerHTML.length).toBeGreaterThan(0);
      expect(e.ts).toContain('@Component');
      expect(e.html.trim().length).toBeGreaterThan(0);
      expect(e.css.trim().length).toBeGreaterThan(0);
    });
  }

  it('aucun exemple ne remet l’astérisque retiré par AMF le 24/09', () => {
    for (const e of EXEMPLES) expect(e.html, e.id).not.toContain('gui-required');
  });
});
