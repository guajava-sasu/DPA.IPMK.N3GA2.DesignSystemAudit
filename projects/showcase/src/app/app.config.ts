import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { provideGalmaMaterial } from 'galma-ui';
import { routes } from './app.routes';

// Nombres et dates au format français (pipes number et date des exemples : « 18,4 », « 0,75 »).
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Routage par # : la vitrine s'ouvre telle quelle depuis un dossier ou un serveur de fichiers, sans réécriture d'URL.
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    { provide: LOCALE_ID, useValue: 'fr' },
    provideGalmaMaterial(),
  ],
};
