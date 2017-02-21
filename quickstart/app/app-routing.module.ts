///<reference path="components/dashboard.component.ts"/>
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./components/dashboard.component";
import {NgModule} from "@angular/core";
import {ComposeMessageComponent} from "./components/compose-message.component";
import {PageNotFoundComponent} from "./components/not-found.component";

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
  imports: [RouterModule.forRoot(routes)],
  //by export routerModule
  //the components declared in AppModule will have access to router directives such as RouterLink and RouterOutlet.
  exports: [RouterModule]
})
export class AppRoutingModule {
}


