import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CurrentUser} from '../../../models/user';

export interface GlobalHeaderRightProps {
  currentUser?: CurrentUser;
  menu?: boolean;
}

@Component({
  selector: 'pro-avatar-dropdown',
  templateUrl: 'avatar-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proAvatarDropdown',
  preserveWhitespaces: false
})
export class AvatarDropdownComponent implements OnInit {

  @Input() currentUser: GlobalHeaderRightProps['currentUser'];
  @Input() menu = true;

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

  onMenuClick() {

  }
}
