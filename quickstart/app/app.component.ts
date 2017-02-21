import {Component} from "@angular/core";

@Component({
  selector: 'my-app',
  template: `
    <h1>Angular Router Demo</h1>
    <nav>
      <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
      <a routerLink="/heroes" routerLinkActive="active">Hero List</a>
    </nav>
    <a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
  `,
  styleUrls: ['./app/app.component.css']
})
export class AppComponent {
}
