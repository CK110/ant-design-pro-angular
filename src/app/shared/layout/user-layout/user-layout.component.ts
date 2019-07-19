import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';

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

  logo:string = 'assets/logo.svg';

  footer:any;

  constructor() {
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
}
