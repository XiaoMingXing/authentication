import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LoginComponent} from "./login.component";
import {AuthService} from "./auth.service";
import {LoginRoutingModule} from "./login-routing.module";
import {DialogService} from "../common/dialog.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService, DialogService],
  exports: []
})
export class AuthModule {
}
