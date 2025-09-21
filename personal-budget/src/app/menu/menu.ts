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
         <li><a [routerLink]="['/contact']">Contact</a></li> 
      </ul>
    </nav>
  `,
   styles: [`
    nav {
      width: 100%;
      background-color: #4d5791;
      height: 44px;
      padding: 0 40px;
    }

    nav ul,
    nav ul li {
      margin: 0;
      padding: 0;
      list-style: none;
      display: inline-block;
    }

    nav ul li a {
      display: block;
      padding: 0 20px;
      line-height: 44px;
      font-size: 1.4em;
      text-decoration: none;
      color: #fff;
      margin: 0;
    }

    nav ul li a:hover {
      background-color: white;
      color: #4d5791;
    }
  `]
})
export class Menu {

}
