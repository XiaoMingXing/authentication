///<reference path="components/dashboard.component.ts"/>
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./components/dashboard.component";
import {HeroesComponent} from "./components/heroes.component";
import {HeroDetailComponent} from "./components/hero-detail.component";
import {NgModule} from "@angular/core";
import {HeroListComponent} from "./components/hero-list.component";
import {PageNotFoundComponent} from "./components/not-found.component";
import {CrisisCenterComponent} from "./components/crisis-center.component";

const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  //routing example
  {
    path: 'hero-list',
    component: HeroListComponent
  },
  {
    path: 'crisis-center',
    component: CrisisCenterComponent
  },
  {
    path: '',
    redirectTo: '/hero-list',
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


