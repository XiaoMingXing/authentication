import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CrisisCenterRoutingModule} from "./crisis-center-routing.module";
import {CrisisListComponent} from "./crisis-list.component";
import {CrisisDetailComponent} from "./crisis-detail.component";
import {CrisisCenterHomeComponent} from "./crisis-center-home.component";
import {CrisisCenterComponent} from "./crisis-center.component";
import {CrisisService} from "./crisis.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CrisisCenterRoutingModule
  ],
  declarations: [CrisisListComponent, CrisisDetailComponent, CrisisCenterHomeComponent, CrisisCenterComponent],
  providers: [CrisisService]
})
export class CrisisCenterModule {
}
