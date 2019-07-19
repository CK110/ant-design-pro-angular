import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  OnInit, TemplateRef, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {menuData} from '../../../app-menu';
// @ts-ignore
import {Settings} from "@pro-layout/lib/default-settings";
import themeColorClient from '../../components/setting-drawer/theme-color-client';
import {SettingsService} from "../../../../../projects/pro-layout/src/lib/core/settings.service";


@Component({
  selector: 'app-basic-layout',
  templateUrl: 'basic-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'appBasicLayout',
  preserveWhitespaces: false
})
export class BasicLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('linkIconTemplate', {static: true})
  linkIconTemplate: TemplateRef<void>;

  settings: Settings;

  menuData = menuData;

  footer:any;

  constructor(private settingService: SettingsService,
              private cdr:ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.settings = this.settingService.settings;

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
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ],
      copyright: '2019 蚂蚁金服体验技术部出品'
    }
  }

  ngAfterViewInit(): void {
  }

  settingChange(event){

    console.log(event['primaryColor']);
    if(event['primaryColor']){
      themeColorClient.changeColor(event['primaryColor']).finally(() =>{
        console.log('修改完成');
      });
    }

    this.cdr.markForCheck();
  }
}
