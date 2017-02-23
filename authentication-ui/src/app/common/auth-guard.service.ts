import {Injectable} from "@angular/core";
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {CONSTANTS} from "./constants";
import {CacheService} from "../cache/cache.service";

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {

  constructor(private route: Router, private cacheService: CacheService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string) {

    let isAuthenticated: string = this.cacheService.get(CONSTANTS.AUTH_KEY);

    if (isAuthenticated) {
      return true;
    }

    this.cacheService.set(CONSTANTS.REDIRECT_KEY, url, {maxAge: CONSTANTS.expireMinutes});

    this.route.navigate(['/simpleLogin']);

    return false
  }
}
