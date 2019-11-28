import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CurrentUser} from '../../../models/user';

export interface GlobalHeaderRightProps {
  currentUser?: CurrentUser;
  menu?: boolean;
}

@Component({
  selector: 'pro-avatar-dropdown',
  templateUrl: 'avatar-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarDropdownComponent implements OnInit {

  @Input() className: any = 'action';
  @Input() currentUser: GlobalHeaderRightProps['currentUser'];
  @Input() menu = true;

  constructor(private cdf: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.currentUser = {
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      name: 'ant design'
    };
  }

  logout() {
  }
}
