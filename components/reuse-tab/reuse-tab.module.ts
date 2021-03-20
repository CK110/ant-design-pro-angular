import {NgModule} from '@angular/core';

import {ReuseTabMenuComponent} from "./reuse-tab-menu.component";
import {ReuseTabComponent} from "./reuse-tab.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzTabsModule} from "ng-zorro-antd/tabs";

@NgModule({
  imports: [CommonModule, RouterModule, NzMenuModule, NzTabsModule],
  exports: [ReuseTabComponent],
  declarations: [ReuseTabMenuComponent, ReuseTabComponent],
  entryComponents: [ReuseTabMenuComponent],
})
export class ReuseTabModule {
}
