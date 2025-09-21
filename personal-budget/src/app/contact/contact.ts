import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
@Component({
  selector: 'pb-contact',
  standalone: true,
  imports: [Hero],
  template: `
    <div class="contact">
    <pb-hero></pb-hero>
      <h1>Contact Us</h1>
      <p>Email: support@personalbudget.com</p>
      <p>Phone: +1 (700) 123-4567</p>
    </div>
  `,
  styles: [`
    .contact {
      ;
    }
    .contact h1 {
      color: #4d5791;
    }
  `]
})
export class Contact {}
