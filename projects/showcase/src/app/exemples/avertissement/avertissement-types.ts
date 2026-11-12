import { Component } from '@angular/core';

/**
 * Disclaimer
 * Mention discrète en Caption Italic sur fond Feedback Background (Radius/S, marges 16 / 8, icône 18)
 * : version pilote, données indicatives, source externe. Se pose en pied de page ou au-dessus d'un
 * tableau ; elle occupe la largeur du conteneur (800 px dans le Figma).
 */
@Component({
  selector: 'ex-avertissement-types',
  imports: [],
  templateUrl: './avertissement-types.html',
  styleUrl: './avertissement-types.css',
})
export class AvertissementTypes {
  protected readonly mentions = [
    {
      classe: 'gui-info',
      icone: 'info',
      texte: 'Version pilote de l’écran de suivi : signaler tout écart au support MES.',
    },
    {
      classe: 'gui-success',
      icone: 'check_circle',
      texte: 'Données synchronisées avec OG à 20 h 45.',
    },
    {
      classe: 'gui-warning',
      icone: 'warning',
      texte: 'Poids indicatifs : la pesée de la bascule n’est pas encore reçue.',
    },
    {
      classe: 'gui-error',
      icone: 'error',
      texte: 'Liaison H11 interrompue depuis 20 h 12 : valeurs figées.',
    },
    {
      classe: 'gui-neutral',
      icone: 'info',
      texte: 'Mesures relevées par le pyromètre de sortie du four.',
    },
  ];
}
