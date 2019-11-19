import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule, NzAddOnModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Components} from './components';
import {ProLayoutModule} from "@pro-layout";
import {LayoutComponents} from "./layout";
import {DelonACLModule} from "@delon/acl";
import {TranslateModule} from "@ngx-translate/core";
import {DelonChartModule} from "@delon/chart";

const Modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,

  NgZorroAntdModule,
  NzAddOnModule,
  ProLayoutModule,
  DelonACLModule,
  DelonChartModule,
  TranslateModule
];

@NgModule({
  imports: [
    ...Modules,
  ],
  exports: [
    ...Modules,
    ...Components,
    ...LayoutComponents
  ],
  declarations: [
    ...Components,
    ...LayoutComponents
  ]
})
export class SharedModule {
}
