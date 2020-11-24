/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ElementRef, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'pro-tab-add-button, button[pro-tab-add-button]',
  template: `
    <ng-container *nzStringTemplateOutlet="addIcon; let icon">
      <i nz-icon [nzType]="icon" nzTheme="outline"></i>
    </ng-container>
  `,
  host: {
    class: 'ant-pro-tabs-nav-add',
    'aria-label': 'Add tab',
    type: 'button'
  }
})
export class ProTabAddButtonComponent {
  @Input() addIcon: string | TemplateRef<any> = 'plus';

  private readonly element: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.element = this.elementRef.nativeElement;
  }

  getElementWidth(): number {
    return this.element.offsetWidth || 0;
  }

  getElementHeight(): number {
    return this.element.offsetHeight || 0;
  }
}
