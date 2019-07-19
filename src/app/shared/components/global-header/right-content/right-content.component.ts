import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuTheme} from "../../../../../../projects/pro-layout/src/lib/core/default-settings";

@Component({
  selector: 'pro-right-content',
  templateUrl: 'right-content.component.html',
  styleUrls: ['right-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  exportAs: 'proRightContent',
  preserveWhitespaces: false,
})
export class RightContentComponent implements OnInit {

  @Input() theme: MenuTheme;
  @Input() layout: string;

  currentUser:any;

  constructor(private cdf: ChangeDetectorRef) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.currentUser = {
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        name: 'ant design'
      };
      this.cdf.markForCheck();
    }, 2000);
  }
}
