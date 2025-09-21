import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pb-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
   
       <div class="hero">
      <h1 [routerLink]="['/']">Personal Budget</h1>
      <h2>A personal-budget management app</h2>
    </div>
    
  `,
  styles: []
})
export class Hero {

}
