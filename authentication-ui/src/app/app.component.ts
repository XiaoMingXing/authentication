import {Component} from "@angular/core";

@Component({
  selector: 'authentication-app',
  template: `
      <h1>Authentication Demo</h1>
      <a [routerLink]="['/simpleLogin']">Login>></a>
      <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
