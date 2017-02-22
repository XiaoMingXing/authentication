///<reference path="components/dashboard.component.ts"/>
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./components/dashboard.component";
import {NgModule} from "@angular/core";
import {ComposeMessageComponent} from "./components/compose-message.component";
import {PageNotFoundComponent} from "./components/not-found.component";
import {AuthGuard} from "./login/auth-guard.service";
import {SelectivePreloadingStrategy} from "./common/selective-preloading-strategy";
import {CanDeactivateGuard} from "./login/can-deactive-guard.service";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'admin',
    loadChildren: '/app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'crisis-center',
    loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
    data: {preload: false}
  },
  {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: SelectivePreloadingStrategy})],
  //by export routerModule
  //the components declared in AppModule will have access to router directives such as RouterLink and RouterOutlet.
  exports: [RouterModule],
  providers: [CanDeactivateGuard, SelectivePreloadingStrategy]
})
export class AppRoutingModule {
}


