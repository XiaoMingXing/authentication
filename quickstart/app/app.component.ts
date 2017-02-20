import {Component} from "@angular/core";

@Component({
  selector: 'my-app',
  template: `
    <h2>{{title}}</h2>
    <!--<nav>
     <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
     <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    -->
    
    <h1>Angular Router Demo</h1>
    <nav>
      <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
      <a routerLink="/hero-list" routerLinkActive="active">Hero List</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/styles/app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
