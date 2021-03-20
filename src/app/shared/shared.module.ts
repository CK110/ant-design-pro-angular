import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Components} from './components';
import {LayoutComponents} from "./layout";
import {DelonACLModule} from "@delon/acl";
import {TranslateModule} from "@ngx-translate/core";
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";

const Modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,

  ...SHARED_ZORRO_MODULES,
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
