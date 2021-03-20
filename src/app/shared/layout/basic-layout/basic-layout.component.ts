import {
  AfterViewInit,
  Component,
  OnInit, TemplateRef, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {menuData} from '../../../app-menu';

@Component({
  selector: 'app-basic-layout',
  templateUrl: 'basic-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  host: {
    '[class.colorweak]': 'false',
  }
})
export class BasicLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('linkIconTemplate', {static: true})
  linkIconTemplate: TemplateRef<void>;

  settings: any;

  menuData = menuData;

  footer: any;

  constructor() {
  }

  ngOnInit(): void {

    this.settings = {
      title: 'Ant Design Pro',
      logo: 'assets/logo.svg',
      navTheme: 'dark',
      primaryColor: '#1890FF',
      layout: 'sidemenu',
      contentWidth: 'Fluid',
      fixedHeader: true,
      autoHideHeader: false,
      fixSiderbar: true,
      reuseTab: true
    };

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
