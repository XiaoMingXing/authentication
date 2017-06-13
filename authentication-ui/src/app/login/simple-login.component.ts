import {Component, OnInit} from "@angular/core";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {CONSTANTS} from "../common/constants";
import {CacheService} from "../cache/cache.service";

@Component({
  selector: 'simple-login',
  templateUrl: './app/login/login.component.html',
  styleUrls: ['./app/login/login.component.css'],
  providers: [LoginService, CacheService]
})
export class SimpleLoginComponent implements OnInit {

  user: User = {email: "920477852@qq.com", password: "password"};

  errorMsg: string = "";

  constructor(private loginService: LoginService, private cacheService: CacheService,
              private router: Router) {
  }

  onLogin() {
    this.loginService.login(this.user)
      .subscribe(
        res => {

          this.cacheService.set(CONSTANTS.AUTH_KEY, true, {maxAge: CONSTANTS.expireMinutes});

          this.cacheService.set(CONSTANTS.AUTH_USER, res, {maxAge: CONSTANTS.expireMinutes});

          let redirectUrl: string = this.cacheService.get(CONSTANTS.REDIRECT_KEY);

          if (!redirectUrl) {
            redirectUrl = 'dashboard';
          }

          this.router.navigate([redirectUrl]);
        },
        err => this.handleError(err));
  }

  onSignup() {

  }

  private handleError(err: any) {
    this.errorMsg = typeof err._body === 'object' ? "Network error" : err._body;
  }

  onGoogleLoginSuccess = (googleUser: any) => {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  };

  /*onSignOut() {*/
  /*  var auth2 = gapi.auth2.getAuthInstance();*/
  /*  auth2.signOut().then(function () {*/
  /*    console.log('User signed out.');*/
  /*  });*/
  /*}*/

  ngOnInit() {
  }
}
