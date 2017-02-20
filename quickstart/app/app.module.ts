import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {HeroDetailComponent} from "./components/hero-detail.component";
import {HeroService} from "./services/hero.service";
import {HeroesComponent} from "./components/heroes.component";
import {DashboardComponent} from "./components/dashboard.component";
import {AppRoutingModule} from "./app-routing.module";
import {APP_BASE_HREF} from "@angular/common";
import {HttpModule} from "@angular/http";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./mocks/in-memory-data.service";
import {HeroSearchComponent} from "./components/hero-search.component";
import {HeroListComponent} from "./components/hero-list.component";
import {CrisisCenterComponent} from "./components/crisis-center.component";
import {PageNotFoundComponent} from "./components/not-found.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    HeroListComponent,
    CrisisCenterComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent],
  providers: [HeroService, {provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule {
}
