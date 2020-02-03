import {Component, OnInit} from '@angular/core';


type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

  mode: 'inline' | 'horizontal' = 'inline';
  selectKey: SettingsStateKeys = 'base';
  menuMap: any = {
    base: '基本设置',
    security: '安全设置',
    binding: '账号绑定',
    notification: '新消息通知'
  };

  constructor() {
  }

  ngOnInit() {
  }
}
