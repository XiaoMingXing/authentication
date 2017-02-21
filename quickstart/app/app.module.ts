import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./components/dashboard.component";
import {AppRoutingModule} from "./app-routing.module";
import {APP_BASE_HREF} from "@angular/common";
import {CrisisCenterModule} from "./crisis-center/crisis-center.module";
import {PageNotFoundComponent} from "./components/not-found.component";
import {HeroesModule} from "./heroes/heroes.module";
import {ComposeMessageComponent} from "./components/compose-message.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    CrisisCenterModule,
    AppRoutingModule],
  declarations: [
    AppComponent,
    DashboardComponent,
    ComposeMessageComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule {
}
