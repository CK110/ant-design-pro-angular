import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BasicProfileComponent} from "./basic-profile/basic-profile.component";
import {AdvancedProfileComponent} from "./advanced-profile/advanced-profile.component";

const routes: Routes = [
  {path: '', redirectTo: 'basic', pathMatch: 'full'},
  {path: 'basic', component: BasicProfileComponent, data: {name: '基础详情页'}},
  {path: 'advanced', component: AdvancedProfileComponent, data: {name: '高级详情页'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
