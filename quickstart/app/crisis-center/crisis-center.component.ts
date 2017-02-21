import {Component, OnInit} from "@angular/core";

@Component({
  template: `
     <h2>CRISIS CENTER</h2>
     <router-outlet></router-outlet>
  `
})
export class CrisisCenterComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
