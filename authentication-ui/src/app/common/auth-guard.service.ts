import {Injectable} from "@angular/core";
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return undefined;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return undefined;
  }

  constructor() {
  }
}
