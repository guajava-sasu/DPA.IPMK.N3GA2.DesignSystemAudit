/** Mode d'affichage : clair (AMF) ou sombre (proposition galma-ui, classe `dark` sur <html>). */
export type GalmaThemeMode = 'light' | 'dark';

export function setGalmaThemeMode(
  mode: GalmaThemeMode,
  root: HTMLElement = document.documentElement,
): void {
  root.classList.toggle('dark', mode === 'dark');
}

export function getGalmaThemeMode(root: HTMLElement = document.documentElement): GalmaThemeMode {
  return root.classList.contains('dark') ? 'dark' : 'light';
}
