import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './menu/menu';
import { Footer } from './footer/footer';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';

@Component({
  selector: 'pb-root',
  standalone: true,
  imports: [RouterOutlet, Menu, Footer, Breadcrumbs],
  template: `
    <a href="#main" class="skip">Skip to content</a>
    <pb-menu></pb-menu>
    <router-outlet></router-outlet>
    <pb-footer></pb-footer>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('personal-budget');
}
