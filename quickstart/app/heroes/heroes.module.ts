import {NgModule} from "@angular/core";
import {HeroListComponent} from "./hero-list.component";
import {CommonModule} from "@angular/common";
import {HeroDetailComponent} from "./hero-detail.component";
import {FormsModule} from "@angular/forms";
import {HeroService} from "./hero.service";
import {HeroesRoutingModule} from "./heroes-routing.module";
import {HeroSearchComponent} from "./hero-search.component";
import {HttpModule} from "@angular/http";
import {InMemoryDataService} from "../mocks/in-memory-data.service";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [HeroListComponent, HeroDetailComponent, HeroSearchComponent],
  providers: [HeroService],
  exports: [HeroSearchComponent]
})
export class HeroesModule {
}
