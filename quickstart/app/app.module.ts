import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./components/dashboard.component";
import {AppRoutingModule} from "./app-routing.module";
import {APP_BASE_HREF} from "@angular/common";
import {PageNotFoundComponent} from "./components/not-found.component";
import {ComposeMessageComponent} from "./components/compose-message.component";
import {AuthModule} from "./login/login.module";
import {CanDeactivateGuard} from "./login/can-deactive-guard.service";
import {HeroesModule} from "./heroes/heroes.module";
import {Router} from "@angular/router";
import {DialogService} from "./common/dialog.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    AuthModule,
    AppRoutingModule],
  declarations: [
    AppComponent,
    DashboardComponent,
    ComposeMessageComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, CanDeactivateGuard, DialogService]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
