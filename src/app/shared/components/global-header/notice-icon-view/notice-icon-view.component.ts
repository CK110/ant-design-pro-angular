import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'pro-notice-icon-view',
  templateUrl: 'notice-icon-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proNoticeIconView',
  preserveWhitespaces: false
})
export class NoticeIconViewComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
