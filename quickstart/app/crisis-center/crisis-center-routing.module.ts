import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CrisisCenterHomeComponent} from "./crisis-center-home.component";
import {CrisisDetailComponent} from "./crisis-detail.component";
import {CrisisListComponent} from "./crisis-list.component";
import {CrisisCenterComponent} from "./crisis-center.component";
import {CanDeactivateGuard} from "../login/can-deactive-guard.service";
import {CrisisDetailResolver} from "./crisis-center-resolver.service";

const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolver
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(crisisCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [CrisisDetailResolver]
})
export class CrisisCenterRoutingModule {
}
