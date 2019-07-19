import {NgModule} from '@angular/core';

import {Exception403Component} from "./403/403.component";
import {Exception404Component} from "./404/404.component";
import {Exception500Component} from "./500/500.component";
import {SharedModule} from "../../shared/shared.module";
import {ExceptionRoutingModule} from "./exception-routing.module";

@NgModule({
  imports: [SharedModule, ExceptionRoutingModule],
  exports: [],
  declarations: [
    Exception403Component,
    Exception404Component,
    Exception500Component,
  ],
  providers: [],
})
export class ExceptionModule {
}
