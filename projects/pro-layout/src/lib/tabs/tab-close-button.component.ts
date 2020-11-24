/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, Input, TemplateRef } from '@angular/core';


@Component({
  selector: 'pro-tab-close-button, button[pro-tab-close-button]',
  template: `
    <ng-container *nzStringTemplateOutlet="closeIcon; let icon">
      <i nz-icon [nzType]="closeIcon" nzTheme="outline"></i>
    </ng-container>
  `,
  host: {
    class: 'ant-pro-tabs-tab-remove',
    'aria-label': 'Close tab',
    type: 'button'
  }
})
export class ProTabCloseButtonComponent {
  @Input() closeIcon: string | TemplateRef<any> = 'close';

  constructor() {}
}
