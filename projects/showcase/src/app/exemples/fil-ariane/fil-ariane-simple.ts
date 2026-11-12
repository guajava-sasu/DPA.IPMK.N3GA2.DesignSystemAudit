import { Component } from '@angular/core';

/**
 * Fil d'Ariane
 * Breadcrumb Items=3 : liens en Foreground/Link (soulignés au survol), page courante en
 * Foreground/Secondary avec aria-current="page", chevron 16 px entre les niveaux (généré par le CSS,
 * ignoré par les aides techniques).
 */
@Component({
  selector: 'ex-fil-ariane-simple',
  imports: [],
  templateUrl: './fil-ariane-simple.html',
  styleUrl: './fil-ariane-simple.css',
})
export class FilArianeSimple {}
