import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BasicFormComponent} from "./basic-form/basic-form.component";
import {StepFormComponent} from "./step-form/step-form.component";
import {AdvancedFormComponent} from "./advanced-form/advanced-form.component";

const routes: Routes = [
  { path: '', redirectTo: 'base-form', pathMatch: 'full'},
  { path: 'basic-form',component: BasicFormComponent,data:{ name: '基础表单'}},
  { path: 'step-form',component: StepFormComponent,data:{ name: '分步表单'}},
  { path: 'advanced-form',component: AdvancedFormComponent,data:{name: '高级表单'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
