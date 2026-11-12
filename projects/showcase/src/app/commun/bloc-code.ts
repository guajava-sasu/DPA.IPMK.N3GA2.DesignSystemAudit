import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { copier } from './copier';

/** Bloc de code avec bouton Copier. */
@Component({
  selector: 'vt-bloc-code',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="bloc">
      <div class="entete">
        <span class="langue">{{ langue() }}</span>
        <button matButton class="gui-sm gui-neutral" type="button" (click)="copierCode()">
          <mat-icon>{{ copie() ? 'check' : 'content_copy' }}</mat-icon>{{
            copie() ? 'Copié' : 'Copier'
          }}
        </button>
      </div>
      <pre tabindex="0"><code>{{ code() }}</code></pre>
    </div>
  `,
  styles: `
    .bloc {
      border: 1px solid var(--amf-border-default);
      border-radius: var(--amf-radius-m);
      background: var(--amf-background-surface-subtle);
      overflow: hidden;
    }
    .entete {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 4px 4px 12px;
      border-bottom: 1px solid var(--amf-border-default);
    }
    .langue {
      font: var(--amf-text-overline-weight) var(--amf-text-overline-size) /
        var(--amf-text-overline-line-height) var(--gui-font);
      letter-spacing: var(--amf-text-overline-letter-spacing);
      text-transform: uppercase;
      color: var(--amf-foreground-secondary);
    }
    pre {
      margin: 0;
      padding: 12px;
      overflow: auto;
      max-height: 420px;
      font: 13px/1.5 var(--code-police);
      color: var(--amf-foreground-primary);
    }
    pre:focus-visible {
      outline: 2px solid var(--amf-border-focus);
      outline-offset: -2px;
    }
  `,
})
export class BlocCode {
  readonly code = input.required<string>();
  readonly langue = input('');
  protected readonly copie = signal(false);

  protected async copierCode(): Promise<void> {
    if (await copier(this.code())) {
      this.copie.set(true);
      setTimeout(() => this.copie.set(false), 1500);
    }
  }
}
