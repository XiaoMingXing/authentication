import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {SimpleLoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CacheModule} from "./cache/cache.module";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, CacheModule, AppRoutingModule],
  declarations: [AppComponent, SimpleLoginComponent, DashboardComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
