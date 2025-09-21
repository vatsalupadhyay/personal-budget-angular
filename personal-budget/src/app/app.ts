import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './menu/menu';
import { Footer } from './footer/footer';
import { HttpClientModule } from '@angular/common/http';
import { Homepage } from './homepage/homepage';
import { Article } from './article/article';
import { Login } from './login/login';
import { P404 } from './p404/p404';
import { About } from './about/about';
import { Hero } from './hero/hero';
@Component({
  selector: 'pb-root',
  imports: [RouterOutlet, Menu, Footer, HttpClientModule],
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
