import { describe, expect, it } from 'vitest';
import { getAmfThemeMode, setAmfThemeMode } from './theme-mode';

describe('mode d’affichage', () => {
  it('pose et retire la classe dark', () => {
    const racine = document.createElement('html');
    expect(getAmfThemeMode(racine)).toBe('light');
    setAmfThemeMode('dark', racine);
    expect(racine.classList.contains('dark')).toBe(true);
    expect(getAmfThemeMode(racine)).toBe('dark');
    setAmfThemeMode('light', racine);
    expect(racine.classList.contains('dark')).toBe(false);
  });
});
