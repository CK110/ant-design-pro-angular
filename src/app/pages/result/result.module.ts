import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {SuccessComponent} from "./success/success.component";
import {FailComponent} from "./fail/fail.component";
import {ResultRoutingModule} from "./result-routing.module";

@NgModule({
  imports: [SharedModule, ResultRoutingModule],
  exports: [],
  declarations: [
    SuccessComponent,
    FailComponent
  ],
  providers: [],
})
export class ResultModule {
}
