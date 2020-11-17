import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CurrentUser} from '../../../models/user';
import {Router} from "@angular/router";

export interface GlobalHeaderRightProps {
  currentUser?: CurrentUser;
  menu?: boolean;
}

@Component({
  selector: 'pro-avatar-dropdown',
  templateUrl: 'avatar-dropdown.component.html',

})
export class AvatarDropdownComponent implements OnInit {

  @Input() className: any = 'action';
  @Input() currentUser: GlobalHeaderRightProps['currentUser'];
  @Input() menu = true;

  constructor(private cdf: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = {
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      name: 'ant design'
    };
  }

  logout() {
    this.router.navigate(['/user/login'],{ replaceUrl: true }).then();
  }
}
