import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {User} from "../common/login.model";
import {CONSTANTS} from "../common/constants";
import {Observable} from "rxjs";

@Injectable()
export class LoginService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  login(user: User): Observable<User> {
    return this.http
      .post(CONSTANTS.ServiceUrls.authUrl, JSON.stringify(user), {headers: this.headers})
      .map(response => response.json().data as User);
  }
}
