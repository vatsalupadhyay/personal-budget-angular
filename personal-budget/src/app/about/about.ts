import { Component } from '@angular/core';
import { Hero } from '../hero/hero';

@Component({
  selector: 'pb-about',
  standalone: true,
  imports: [Hero],
  template: `
    <pb-hero></pb-hero>
    <main id="main" class="center page-area">
      <p>
        about works!
      </p>
    </main>
  `,
  styles: ``
})
export class About {

}
