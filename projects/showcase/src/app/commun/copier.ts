/** Copie dans le presse-papiers ; repli execCommand quand l'API n'est pas disponible (page servie en http). */
export async function copier(texte: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texte);
      return true;
    }
  } catch {
    /* repli ci-dessous */
  }
  const zone = document.createElement('textarea');
  zone.value = texte;
  zone.setAttribute('readonly', '');
  zone.style.position = 'fixed';
  zone.style.opacity = '0';
  document.body.appendChild(zone);
  zone.select();
  const ok = document.execCommand('copy');
  zone.remove();
  return ok;
}
