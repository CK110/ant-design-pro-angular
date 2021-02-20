import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ContentWidth} from '../core/default-settings';

@Component({
  selector: 'pro-grid-content',
  template: `
    <div class="ant-pro-grid-content" [ngClass]="{'wide': contentWidth === 'Fixed'}">
        <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proGridContent',
  preserveWhitespaces: false
})
export class GridContentComponent implements OnInit {

  @Input() contentWidth: ContentWidth;

  constructor() {
  }

  ngOnInit() {
  }
}
