/**
 * Created by mxxiao on 2/17/17.
 */
import {Component, OnInit} from "@angular/core";
import {User} from "../models/user.model";

@Component({
  selector: 'dashboard',
  templateUrl: './app/dashboard/dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  user: User = {email: "xiao", password: "password"};

  constructor() {
  }

  ngOnInit() {
  }
}
