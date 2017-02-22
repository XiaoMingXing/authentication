import {Injectable} from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild,CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  private checkLogin(url: string): boolean {

    if (this.authService.isLoggedIn) {
      return true;
    }

    let sessionId = 123456789;

    let navigationExtras: NavigationExtras = {
      queryParams: {'session_id': sessionId},
      fragment: 'anchor'
    };

    this.authService.redirectUrl = url;

    this.router.navigate(['/login'], navigationExtras);

    return false;
  }
}
