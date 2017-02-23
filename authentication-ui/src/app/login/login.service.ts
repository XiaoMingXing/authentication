import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {CONSTANTS} from "../common/constants";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {User} from "../models/user.model";
import {CacheService} from "../cache/cache.service";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private cacheService: CacheService,
              private router: Router) {
  }

  login(user: User): Observable<User> {
    return this.http
      .post(CONSTANTS.ServiceUrls.authUrl, user, {headers: this.headers})
      .map(response => response.json().data as User);
  }

  logout(): any {

    this.cacheService.remove(CONSTANTS.AUTH_KEY);

    this.router.navigate(['simpleLogin']);
  }

  getLoginUser(): User {

    if(this.isAuthenticated()){

      return this.cacheService.get(CONSTANTS.AUTH_USER);

    }
  }

  isAuthenticated(): boolean {
    return !!this.cacheService.get(CONSTANTS.AUTH_KEY);
  }
}
