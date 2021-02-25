import {NgModule} from '@angular/core';

import {ReuseTabMenuComponent} from "./reuse-tab-menu.component";
import {ReuseTabComponent} from "./reuse-tab.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {ProTabsModule} from "../tabs/tabs.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProTabsModule,
    NzMenuModule
  ],
  exports: [
    ReuseTabComponent
  ],
  declarations: [ReuseTabMenuComponent, ReuseTabComponent],
  entryComponents: [ReuseTabMenuComponent],
  providers: []
})
export class ReuseTabModule {
}
