import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Exception403Component} from "./403/403.component";
import {Exception404Component} from "./404/404.component";
import {Exception500Component} from "./500/500.component";

const routes: Routes = [
  {path: '', redirectTo: '403', pathMatch: 'full'},
  {path: '403', component: Exception403Component, data: {}},
  {path: '404', component: Exception404Component, data: {}},
  {path: '500', component: Exception500Component, data: {}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionRoutingModule {
}
