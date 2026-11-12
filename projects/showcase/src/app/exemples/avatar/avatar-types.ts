import { Component } from '@angular/core';

/**
 * Initiales, icône et image
 * Tailles XS 24, S 32, M 40 (défaut), L 56 ; couleurs Primary, Secondary, Neutral, Green, Navy,
 * Purple. L'avatar porte un nom accessible (role="img" et aria-label) quand il est seul ; à côté du
 * nom affiché, il est décoratif (aria-hidden).
 */
@Component({
  selector: 'ex-avatar-types',
  imports: [],
  templateUrl: './avatar-types.html',
  styleUrl: './avatar-types.css',
})
export class AvatarTypes {
  protected readonly tailles = [
    { nom: 'XS', classe: 'gui-xs' },
    { nom: 'S', classe: 'gui-sm' },
    { nom: 'M', classe: '' },
    { nom: 'L', classe: 'gui-lg' },
  ];
  protected readonly couleurs = [
    '',
    'gui-secondary',
    'gui-neutral',
    'gui-green',
    'gui-navy',
    'gui-purple',
  ];
}
