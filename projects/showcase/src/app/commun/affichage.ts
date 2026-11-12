import { Injectable, signal } from '@angular/core';
import { AmfThemeMode, setAmfThemeMode } from 'amf-design-system';

/**
 * Animations Material de la vitrine (réglage lu au démarrage : provideAmfMaterial ne change pas à chaud).
 * Paramètre d'URL ?animations=0 ou choix mémorisé.
 */
export function animationsVitrine(): boolean {
  try {
    const p = new URLSearchParams(location.search).get('animations');
    return (p ?? localStorage.getItem('vt-animations')) !== '0';
  } catch {
    return true;
  }
}

/** Mode clair / sombre, mode de rayon AMF (Default / Rounded) et animations, mémorisés pour la vitrine. */
@Injectable({ providedIn: 'root' })
export class Affichage {
  readonly mode = signal<AmfThemeMode>(this.lire('vt-mode') === 'dark' ? 'dark' : 'light');
  readonly arrondi = signal(this.lire('vt-arrondi') === '1');
  readonly animations = animationsVitrine();

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

  /** Recharge la vitrine : les réglages Material sont fournis au démarrage. */
  changerAnimations(actives: boolean): void {
    this.ecrire('vt-animations', actives ? '1' : '0');
    try {
      const url = new URL(location.href);
      url.searchParams.delete('animations');
      location.replace(url.toString());
    } catch {
      location.reload();
    }
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
