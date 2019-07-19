import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AnalysicComponent} from "./analysic/analysic.component";
import {MonitorComponent} from "./monitor/monitor.component";
import {WorkplaceComponent} from "./workplace/workplace.component";

const routes: Routes = [
  { path: '', redirectTo: 'analysis', pathMatch: 'full'},
  { path: 'analysis', component: AnalysicComponent, data: {name: '分析页'}},
  { path: 'monitor', component: MonitorComponent, data: {name: '监控页'}},
  { path: 'workplace', component: WorkplaceComponent, data: {name: '工作台'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
