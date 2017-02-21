import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeroDetailComponent} from "./hero-detail.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LoginComponent} from "./login.component";
import {AuthService} from "./auth.service";
import {LoginRoutingModule} from "./login-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService],
  exports: []
})
export class AuthModule {
}
