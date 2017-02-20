import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroListComponent} from "./hero-list.component";

const routes: Routes = [
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  //routing example
  {
    path: 'heroes',
    component: HeroListComponent
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {
}
