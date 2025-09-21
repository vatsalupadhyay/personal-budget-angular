
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pb-article',
  standalone: true,
  imports: [CommonModule],
  template: `
<article class="pb-article">
  <header>
    <h1 *ngIf="title; else projectedTitle">{{ title }}</h1>
    <ng-template #projectedTitle>
      <ng-content select="h1"></ng-content>
    </ng-template>
  </header>

  <section>
    <p *ngIf="content; else projectedContent">{{ content }}</p>
    <ng-template #projectedContent>
      <ng-content select="p"></ng-content>
    </ng-template>
  </section>

  <!-- extra projected content (images, buttons, etc.) -->
  <ng-content select="[extra]"></ng-content>
</article>
  `,
  styles: ``
})
export class Article {
  // allow both [title] and [Title] bindings by using alias for the input
  @Input('Title') title?: string;
  @Input('Content') content?: string;

}
