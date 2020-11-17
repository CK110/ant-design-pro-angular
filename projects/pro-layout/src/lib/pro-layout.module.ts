import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule, NzAddOnModule} from 'ng-zorro-antd';
import {BaseMenuComponent} from './sider-menu/base-menu.component';
import {RouterModule} from '@angular/router';
import {BasicLayoutComponent} from './layout/basic-layout.component';
import {GlobalHeaderComponent} from './global-header/global-header.component';
import {GridContentComponent} from './grid-content/grid-content.component';
import {PageHeaderWrapperComponent} from './page-header-wrapper/page-header-wrapper.component';
import {TopNavHeaderComponent} from './top-nav-header/top-nav-header.component';
import {SettingDrawerComponent} from './setting-drawer/setting-drawer.component';
import {GlobalFooterComponent} from './global-footer/global-footer.component';
import {BlockCheckboxComponent} from './setting-drawer/block-checkbox/block-checkbox.component';
import {ThemeColorComponent} from './setting-drawer/theme-color/theme-color.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DelonACLModule} from "@delon/acl";
import {TranslateModule} from "@ngx-translate/core";
import {ReuseTabModule} from "./reuse-tab/reuse-tab.module";

const Layouts = [
  GlobalHeaderComponent,
  BasicLayoutComponent,
  GridContentComponent,
  PageHeaderWrapperComponent,
  TopNavHeaderComponent,
  SettingDrawerComponent,
  GlobalFooterComponent,
  BlockCheckboxComponent,
  ThemeColorComponent,
  BaseMenuComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    NgZorroAntdModule,
    DelonACLModule,
    NzAddOnModule,
    TranslateModule,
    ReuseTabModule
  ],
  exports: [
    ...Layouts
  ],
  declarations: [
    ...Layouts
  ],
  providers: [],
})
export class ProLayoutModule {
}
