import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ContentWidth} from '../core/default-settings';

@Component({
  selector: 'pro-grid-content',
  templateUrl: 'grid-content.component.html',
  styleUrls: ['grid-content.component.less'],
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
