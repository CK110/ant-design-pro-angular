import {NgModule} from '@angular/core';

import {CenterComponent} from "./center/center.component";
import {SharedModule} from "../../shared/shared.module";
import {AccountRoutingModule} from "./account-routing.module";
import {SettingsComponent} from "./settings/settings.component";
import {SecurityViewComponent} from "./settings/components/security-view/security-view.component";

const centerComponents = [
  CenterComponent,
];

const settingComponents = [
  SettingsComponent,
  SecurityViewComponent
];

@NgModule({
  imports: [SharedModule, AccountRoutingModule],
  exports: [],
  declarations: [
    ...centerComponents,
    ...settingComponents
  ]
})
export class AccountModule {
}
