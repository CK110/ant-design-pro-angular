import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

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

  @Input() contentWidth: 'Fluid' | 'Fixed';

  constructor() {
  }

  ngOnInit() {
  }
}
