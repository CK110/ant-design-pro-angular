import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CenterComponent} from "./center/center.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {path: '', redirectTo: 'center', pathMatch: 'full'},
  {path: 'center', component: CenterComponent, data: {name: '个人中心'}},
  {path: 'settings', component: SettingsComponent, data: {name: '个人设置'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
