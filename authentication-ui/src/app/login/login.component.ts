import {Component, OnInit} from "@angular/core";
import {LoginService} from "./login.service";

@Component({
  moduleId: "login",
  selector: 'simple-login',
  templateUrl: 'login.component.html'
})
export class SimpleLoginComponent implements OnInit {
  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
  }
}
