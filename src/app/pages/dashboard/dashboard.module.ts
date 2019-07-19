import {NgModule} from '@angular/core';

import {SharedModule} from "../../shared/shared.module";
import {AnalysicComponent} from "./analysic/analysic.component";
import {MonitorComponent} from "./monitor/monitor.component";
import {WorkplaceComponent} from "./workplace/workplace.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  exports: [],
  declarations: [
    AnalysicComponent,
    MonitorComponent,
    WorkplaceComponent
  ]
})
export class DashboardModule {
}
