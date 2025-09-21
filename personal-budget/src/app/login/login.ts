import { Component } from '@angular/core';
import { Hero } from '../hero/hero';

@Component({
  selector: 'pb-login',
  standalone: true,
  imports: [Hero],
  template: `
    <pb-hero></pb-hero>
    <main id="main" class="center page-area">
      <p>
        login works!
      </p>
    </main>
  `,
  styles: ``
})
export class Login {

}
