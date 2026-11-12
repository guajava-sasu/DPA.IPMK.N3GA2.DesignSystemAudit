import { Injectable, signal } from '@angular/core';
import { AmfThemeMode, setAmfThemeMode } from 'amf-design-system';

/** Mode clair / sombre et mode de rayon AMF (Default / Rounded), mémorisés pour la vitrine. */
@Injectable({ providedIn: 'root' })
export class Affichage {
  readonly mode = signal<AmfThemeMode>(this.lire('vt-mode') === 'dark' ? 'dark' : 'light');
  readonly arrondi = signal(this.lire('vt-arrondi') === '1');

  constructor() {
    this.appliquer();
  }

  changerMode(mode: AmfThemeMode): void {
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
    setAmfThemeMode(this.mode());
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
