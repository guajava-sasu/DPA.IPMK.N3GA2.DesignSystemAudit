import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

/**
 * Plage et désactivé
 * Deux curseurs (matSliderStartThumb, matSliderEndThumb) pour une plage. Désactivé : piste
 * Border/Subtle, curseur Action/Disabled.
 */
@Component({
  selector: 'ex-curseur-plage',
  imports: [MatSliderModule],
  templateUrl: './curseur-plage.html',
  styleUrl: './curseur-plage.css',
})
export class CurseurPlage {}
