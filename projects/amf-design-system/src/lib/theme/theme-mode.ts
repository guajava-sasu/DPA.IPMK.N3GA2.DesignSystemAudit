/** Mode d'affichage : clair (AMF) ou sombre (proposition amf-design-system, classe `dark` sur <html>). */
export type AmfThemeMode = 'light' | 'dark';

export function setAmfThemeMode(
  mode: AmfThemeMode,
  root: HTMLElement = document.documentElement,
): void {
  root.classList.toggle('dark', mode === 'dark');
}

export function getAmfThemeMode(root: HTMLElement = document.documentElement): AmfThemeMode {
  return root.classList.contains('dark') ? 'dark' : 'light';
}
