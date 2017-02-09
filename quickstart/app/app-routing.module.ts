///<reference path="components/dashboard.component.ts"/>
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./components/dashboard.component";
import {HeroesComponent} from "./components/heroes.component";
import {HeroDetailComponent} from "./components/hero-detail.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


