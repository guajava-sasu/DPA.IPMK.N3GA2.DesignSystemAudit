import { describe, expect, it } from 'vitest';
import { getGalmaThemeMode, setGalmaThemeMode } from './theme-mode';

describe('mode d’affichage', () => {
  it('pose et retire la classe dark', () => {
    const racine = document.createElement('html');
    expect(getGalmaThemeMode(racine)).toBe('light');
    setGalmaThemeMode('dark', racine);
    expect(racine.classList.contains('dark')).toBe(true);
    expect(getGalmaThemeMode(racine)).toBe('dark');
    setGalmaThemeMode('light', racine);
    expect(racine.classList.contains('dark')).toBe(false);
  });
});
