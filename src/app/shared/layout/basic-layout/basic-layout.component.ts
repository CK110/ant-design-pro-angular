import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  OnInit, TemplateRef, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {menuData} from '../../../app-menu';
import {Settings} from '@pro-layout';
import {SettingsService} from '@pro-layout';
import themeColorClient from '../../components/setting-drawer/theme-color-client';

@Component({
  selector: 'app-basic-layout',
  templateUrl: 'basic-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'appBasicLayout',
  preserveWhitespaces: false,
  host: {
    '[class.colorweak]': 'settings.colorWeak',
  }
})
export class BasicLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('linkIconTemplate', {static: true})
  linkIconTemplate: TemplateRef<void>;

  settings: Settings;

  menuData = menuData;

  footer: any;

  constructor(private settingService: SettingsService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.settings = this.settingService.settings;

    this.footer = {
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
    };
  }

  ngAfterViewInit(): void {
  }

  settingChange(event) {
    console.log(event);
    // if (event.primaryColor) {
    //   themeColorClient.changeColor(event.primaryColor).finally(() => {
    //     console.log('修改完成');
    //   });
    // }
    // this.cdr.markForCheck();
  }

  menuHeaderClick(event: Event) {
    console.log(`onMenuHeaderClick:${event}`);
  }

  collapse(event) {
    console.log(`onCollapse:${event}`);
  }

}
