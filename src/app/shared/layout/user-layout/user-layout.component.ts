import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {SettingsService} from "../../../../../projects/pro-layout/src/lib/core/settings.service";

@Component({
  selector: 'app-user-layout',
  templateUrl: 'user-layout.component.html',
  styleUrls: ['user-layout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  exportAs: 'appUserLayout',
  preserveWhitespaces: false
})
export class UserLayoutComponent implements OnInit {

  @ViewChild('linkIconTemplate', {static: true})
  linkIconTemplate: TemplateRef<void>;

  footer:any;

  constructor(private settingService: SettingsService) {
  }

  ngOnInit() {
    this.footer ={
      links: [
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: this.linkIconTemplate,
          href: 'https://github.com/CK110/ant-design-pro-angular',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ng.ant.design',
          blankTarget: true,
        },
      ],
      copyright: '2019 CK110出品'
    }
  }
}
