import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MonitorComponents} from "./monitor";
import {WorkplaceComponents} from "./workplace";
import {AnalysisComponents} from "./analysis";

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  exports: [],
  declarations: [
    ...WorkplaceComponents,
    ...MonitorComponents,
    ...AnalysisComponents,
  ]
})
export class DashboardModule {
}
