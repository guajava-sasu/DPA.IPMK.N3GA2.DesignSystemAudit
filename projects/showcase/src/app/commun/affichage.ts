import { Injectable, signal } from '@angular/core';
import { GalmaThemeMode, setGalmaThemeMode } from 'galma-ui';

/** Mode clair / sombre et mode de rayon AMF (Default / Rounded), mémorisés pour la vitrine. */
@Injectable({ providedIn: 'root' })
export class Affichage {
  readonly mode = signal<GalmaThemeMode>(this.lire('vt-mode') === 'dark' ? 'dark' : 'light');
  readonly arrondi = signal(this.lire('vt-arrondi') === '1');

  constructor() {
    this.appliquer();
  }

  changerMode(mode: GalmaThemeMode): void {
    this.mode.set(mode);
    this.ecrire('vt-mode', mode);
    this.appliquer();
  }

  changerArrondi(arrondi: boolean): void {
    this.arrondi.set(arrondi);
    this.ecrire('vt-arrondi', arrondi ? '1' : '0');
    this.appliquer();
  }

  private appliquer(): void {
    setGalmaThemeMode(this.mode());
    document.documentElement.classList.toggle('amf-rounded', this.arrondi());
  }

  private lire(cle: string): string | null {
    try {
      const p = new URLSearchParams(location.search).get(cle.replace('vt-', ''));
      return p ?? localStorage.getItem(cle);
    } catch {
      return null;
    }
  }

  private ecrire(cle: string, valeur: string): void {
    try {
      localStorage.setItem(cle, valeur);
    } catch {
      /* stockage indisponible : sans effet */
    }
  }
}
