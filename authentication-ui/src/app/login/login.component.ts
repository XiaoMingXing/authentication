import {Component, OnInit} from "@angular/core";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {User} from "../models/user.model";

@Component({
  selector: 'simple-login',
  templateUrl: './app/login/login.component.html',
  styleUrls: ['./app/login/login.component.css'],
  providers: [LoginService]
})
export class SimpleLoginComponent implements OnInit {

  user: User = {email: "920477852@qq.com", password: "password"};

  errorMsg: string = "";

  constructor(private loginService: LoginService, private router: Router) {
  }

  onLogin() {
    this.loginService.login(this.user)
      .subscribe(
        res => {
          if (res) {
            this.router.navigate('/dashboard')
          }
        },
        err => this.handleError(err));
  }

  private handleError(err: any) {
    this.errorMsg = typeof err._body === 'object' ? "Network error" : err._body;
  }

  ngOnInit() {
  }
}
