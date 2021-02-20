/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { A11yModule } from '@angular/cdk/a11y';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ProTabAddButtonComponent } from './tab-add-button.component';
import { ProTabBodyComponent } from './tab-body.component';
import { ProTabCloseButtonComponent } from './tab-close-button.component';
import { ProTabLinkDirective, ProTabLinkTemplateDirective } from './tab-link.directive';
import { ProTabNavBarComponent } from './tab-nav-bar.component';
import { ProTabNavItemDirective } from './tab-nav-item.directive';
import { ProTabNavOperationComponent } from './tab-nav-operation.component';
import { ProTabScrollListDirective } from './tab-scroll-list.directive';
import { ProTabComponent } from './tab.component';
import { ProTabDirective } from './tab.directive';
import { ProTabsInkBarDirective } from './tabs-ink-bar.directive';
import { ProTabSetComponent } from './tabset.component';
import {NzOutletModule} from "ng-zorro-antd";

const DIRECTIVES = [
  ProTabSetComponent,
  ProTabComponent,
  ProTabNavBarComponent,
  ProTabNavItemDirective,
  ProTabsInkBarDirective,
  ProTabScrollListDirective,
  ProTabNavOperationComponent,
  ProTabAddButtonComponent,
  ProTabCloseButtonComponent,
  ProTabDirective,
  ProTabBodyComponent,
  ProTabLinkDirective,
  ProTabLinkTemplateDirective
];

@NgModule({
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES],
  imports: [
    CommonModule,
    ObserversModule,
    NzIconModule,
    NzOutletModule,
    PlatformModule,
    A11yModule,
    ScrollingModule,
    NzDropDownModule
  ]
})
export class ProTabsModule {}
