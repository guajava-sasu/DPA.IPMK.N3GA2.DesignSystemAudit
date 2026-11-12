import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Menu d'actions
 * mat-menu : items de 40 px avec icône 20 px, raccourci en Caption (span gui-menu-shortcut),
 * séparateur, action destructive isolée en bas (classe gui-destructive).
 */
@Component({
  selector: 'ex-menu-actions',
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatDividerModule],
  templateUrl: './menu-actions.html',
  styleUrl: './menu-actions.css',
})
export class MenuActions {}
