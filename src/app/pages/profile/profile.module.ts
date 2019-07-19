import {NgModule} from '@angular/core';

import {AdvancedProfileComponent} from "./advanced-profile/advanced-profile.component";
import {BasicProfileComponent} from "./basic-profile/basic-profile.component";
import {SharedModule} from "@shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";

@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  exports: [],
  declarations: [
    AdvancedProfileComponent,
    BasicProfileComponent
  ],
  providers: [],
})
export class ProfileModule {
}
