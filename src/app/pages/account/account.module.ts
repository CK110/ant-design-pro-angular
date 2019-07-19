import {NgModule} from '@angular/core';

import {CenterComponent} from "./center/center.component";
import {SharedModule} from "../../shared/shared.module";
import {AccountRoutingModule} from "./account-routing.module";

@NgModule({
  imports: [SharedModule, AccountRoutingModule],
  exports: [],
  declarations: [
    CenterComponent
  ]
})
export class AccountModule {
}
