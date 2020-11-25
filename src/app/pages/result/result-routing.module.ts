import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SuccessComponent} from "./success/success.component";
import {FailComponent} from "./fail/fail.component";

const routes: Routes = [
  {path: '', redirectTo: 'success', pathMatch: 'full'},
  {path: 'success', component: SuccessComponent, data: {name: '成功', reuse: false}},
  {path: 'fail', component: FailComponent, data: {name: '失败', reuse: false}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule {
}
