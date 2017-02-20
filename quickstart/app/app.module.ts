import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./components/dashboard.component";
import {AppRoutingModule} from "./app-routing.module";
import {APP_BASE_HREF} from "@angular/common";
import {HttpModule} from "@angular/http";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./mocks/in-memory-data.service";
import {CrisisCenterComponent} from "./components/crisis-center.component";
import {PageNotFoundComponent} from "./components/not-found.component";
import {HeroesModule} from "./heroes/heroes.module";
import {HeroSearchComponent} from "./heroes/hero-search.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    HeroesModule,
    AppRoutingModule],
  declarations: [
    AppComponent,
    DashboardComponent,
    CrisisCenterComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule {
}
