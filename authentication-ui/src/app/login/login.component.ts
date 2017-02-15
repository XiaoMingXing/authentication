import {Component, OnInit} from "@angular/core";
import {LoginService} from "./login.service";
import {User} from "../common/login.model";

@Component({
  selector: 'simple-login',
  templateUrl: './app/login/login.component.html',
  styleUrls: ['./app/login/login.component.css'],
  providers: [LoginService]
})
export class SimpleLoginComponent implements OnInit {

  user: User = {username: "username", password: "password"};

  constructor(private loginService: LoginService) {
  }

  onLogin() {
    this.loginService.login(this.user)
      .subscribe(res=> {
        debugger;
        console.log(res, "success");
      });
  }

  ngOnInit() {
  }
}
