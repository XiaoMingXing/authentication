import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import "rxjs/add/operator/map";

@Component({
  template: `
    <p>Dashboard</p>
  
    <p>Session ID: {{ sessionId | async }}</p>
    <a id="anchor"></a>
    <p>Token: {{ token | async }}</p>
  `
})
export class AdminDashboardComponent implements OnInit {
  sessionId: Observable<string>;

  token: Observable<string>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.sessionId = this.route
      .queryParams
      .map(params => params['session_id'] || 'None');

    this.token = this.route
      .fragment
      .map(fragment => fragment || 'None');
  }


}
