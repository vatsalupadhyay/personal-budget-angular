


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pb-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="breadcrumbs">
      <a [routerLink]="['/']">Home</a>
      <span>/ Homepage</span>
    </nav>
  `,
  styles: [`
    .breadcrumbs {
      font-size: 14px;
      
      background-color: #4d5791;
      color: white;
      padding: 5px 15px;
      border-radius: 4px;
    }
    .breadcrumbs a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
    .breadcrumbs a:hover {
      text-decoration: underline;
    }
  `]
})
export class Breadcrumbs {}
