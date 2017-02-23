import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SimpleLoginComponent} from "./login/login.component";
import {AuthGuard} from "./common/auth-guard.service";
const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'simpleLogin', component: SimpleLoginComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
