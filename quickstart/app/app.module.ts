import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./components/dashboard.component";
import {AppRoutingModule} from "./app-routing.module";
import {CrisisCenterComponent} from "./components/crisis-center.component";
import {PageNotFoundComponent} from "./components/not-found.component";
import {HeroesModule} from "./heroes/heroes.module";
import {APP_BASE_HREF} from "@angular/common";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
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
