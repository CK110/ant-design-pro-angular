import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {AdvancedFormComponent} from "./advanced-form/advanced-form.component";
import {BasicFormComponent} from "./basic-form/basic-form.component";
import {StepFormComponent} from "./step-form/step-form.component";
import {TableFormComponent} from "./table-form/table-form.component";
import {FormsRoutingModule} from "./forms-routing.module";

@NgModule({
  imports: [SharedModule, FormsRoutingModule],
  declarations: [
    BasicFormComponent,
    StepFormComponent,
    AdvancedFormComponent,
    TableFormComponent
  ],
  exports: []
})
export class FormsModule {
}
