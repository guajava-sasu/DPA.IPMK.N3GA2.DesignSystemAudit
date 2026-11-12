import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Tailles
 * Small 20 px (Label 11 Medium), Medium 24 px (Caption Medium), Large 32 px (Form Label). Désactivé :
 * gui-disabled, avec aria-disabled="true" (état inactif, exempté du contraste comme dans l'audit AMF).
 */
@Component({
  selector: 'ex-badge-tailles',
  imports: [MatIconModule],
  templateUrl: './badge-tailles.html',
  styleUrl: './badge-tailles.css',
})
export class BadgeTailles {}
