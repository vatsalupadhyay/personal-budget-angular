import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'pb-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <ul>
        <li><a [routerLink]="['/']">Home</a></li>
        <li><a [routerLink]="['/about']">About</a></li>
        <li><a [routerLink]="['/login']">Login</a></li>
      </ul>
    </nav>
  `,
  styles: []
})
export class Menu {

}
