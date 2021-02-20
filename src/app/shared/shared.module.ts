import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule, NzOutletModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Components} from './components';
import {ProLayoutModule} from "@pro-layout";
import {LayoutComponents} from "./layout";
import {DelonACLModule} from "@delon/acl";
import {TranslateModule} from "@ngx-translate/core";

const Modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,

  NgZorroAntdModule,
  NzOutletModule,
  ProLayoutModule,
  DelonACLModule,
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
