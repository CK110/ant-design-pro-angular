/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Host, Optional, Self, TemplateRef } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

import { warnDeprecation } from 'ng-zorro-antd';

import { TabTemplateContext } from './interfaces';

/**
 * Fix https://github.com/angular/angular/issues/8563
 */
@Directive({
  selector: 'ng-template[ProTabLink]',
  exportAs: 'ProTabLinkTemplate'
})
export class ProTabLinkTemplateDirective {
  constructor(@Host() public templateRef: TemplateRef<TabTemplateContext>) {}
}

/**
 * This component is for catching `routerLink` directive.
 */
@Directive({
  selector: 'a[pro-tab-link]',
  exportAs: 'ProTabLink'
})
export class ProTabLinkDirective {
  constructor(
    @Optional() @Self() public routerLink?: RouterLink,
    @Optional() @Self() public routerLinkWithHref?: RouterLinkWithHref,
    @Optional() ProTabLinkTemplateDirective?: ProTabLinkTemplateDirective
  ) {
    if (!ProTabLinkTemplateDirective) {
      warnDeprecation(`'a[pro-tab-link]' is deprecated. Please use 'ng-template[ProTabLink] > a[pro-tab-link]' instead.`);
    }
  }
}
