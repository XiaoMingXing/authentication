import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CrisisCenterHomeComponent} from "./crisis-center-home.component";
import {CrisisDetailComponent} from "./crisis-detail.component";
import {CrisisListComponent} from "./crisis-list.component";
import {CrisisCenterComponent} from "./crisis-center.component";
import {CanDeactivateGuard} from "../login/can-deactive-guard.service";

const crisisCenterRoutes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard]
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
  ]
})
export class CrisisCenterRoutingModule { }
