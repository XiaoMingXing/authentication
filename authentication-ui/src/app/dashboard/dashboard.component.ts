import {Component, OnInit} from "@angular/core";
import {User} from "../models/user.model";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'dashboard',
  templateUrl: './app/dashboard/dashboard.component.html',
  providers: [LoginService]
})
export class DashboardComponent implements OnInit {

  user: User = {email: "xiao", password: "password"};

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.user = this.loginService.getLoginUser();
  }

  onLogout() {
    this.loginService.logout();
  }
}
