import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseMenuComponent} from './base-menu.component';
import {BasicLayoutComponent} from './basic-layout.component';
import {GlobalHeaderComponent} from './global-header.component';
import {GridContentComponent} from './grid-content.component';
import {TopNavHeaderComponent} from './top-nav-header.component';
import {GlobalFooterComponent} from './global-footer.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {RouterModule} from "@angular/router";
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzOutletModule} from 'ng-zorro-antd/core/outlet';
import {DelonACLModule} from "@delon/acl";
import {TranslateModule} from "@ngx-translate/core";
import {PageHeaderWrapperComponent} from "./page-header-wrapper.component";

const Layouts = [
  GlobalHeaderComponent,
  BasicLayoutComponent,
  GridContentComponent,
  TopNavHeaderComponent,
  GlobalFooterComponent,
  BaseMenuComponent,
  PageHeaderWrapperComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    NzOutletModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDrawerModule,
    NzPageHeaderModule,
    NzTabsModule,
    NzBreadCrumbModule,
    DelonACLModule,
    TranslateModule,
  ],
  exports: [
    ...Layouts
  ],
  declarations: [
    ...Layouts
  ],
  providers: [],
})
export class LayoutModule {
}
