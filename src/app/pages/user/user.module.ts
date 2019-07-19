import {NgModule} from '@angular/core';

import {SharedModule} from "../../shared/shared.module";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {RegisterResultComponent} from "./register-result/register-result.component";

const COMPONENTS=[
  LoginComponent,
  RegisterComponent,
  RegisterResultComponent,
];

@NgModule({
  imports: [SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [],
})
export class UserModule {
}
