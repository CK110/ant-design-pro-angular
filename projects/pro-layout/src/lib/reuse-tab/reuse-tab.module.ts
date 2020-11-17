import {NgModule} from '@angular/core';

import {ReuseTabMenuComponent} from "./reuse-tab-menu.component";
import {ReuseTabComponent} from "./reuse-tab.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {NzTabsModule} from "../tabs";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
    NzTabsModule
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
