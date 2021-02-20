import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {ContentWidth, MenuTheme} from '../core/default-settings';
import {isBrowser} from '../utils/utils';
import {MenuDataItem} from './base-menu.component';

@Component({
  selector: 'pro-top-nav-header,[pro-top-nav-header]',
  template: `
      <div class="{{baseClassName}}-main" [ngClass]="{'wide':contentWidth === 'Fixed' }">
          <div class="{{baseClassName}}-left" (click)="menuHeaderClick($event)">
              <div class="{{baseClassName}}-logo" key="logo" id="logo">
                  <ng-container *ngTemplateOutlet="menuHeaderRender ? menuHeaderRender: defaultHeaderTemplate"
                                [ngTemplateOutlet]="{logo:title, title:title}"></ng-container>
                  <ng-template #defaultHeaderTemplate>
                      <a href="/">
                          <ng-container *nzStringTemplateOutlet="logo">
                              <img [src]="logo" alt="logo"/>
                          </ng-container>
                          <h1>
                              <ng-container *nzStringTemplateOutlet="title">{{title}}</ng-container>
                          </h1>
                      </a>
                  </ng-template>
              </div>
          </div>

          <!--增加滚动条,ng-zorro本身bug，https://github.com/NG-ZORRO/ng-zorro-antd/issues/2531-->
          <div [style.max-width.px]="maxWidth" style="flex:1;overflow-x: auto;overflow-y: hidden;"
               class="{{baseClassName}}-menu">
              <pro-base-menu
                      [menuData]="menuData"
                      [theme]="theme"
                      [mode]="'horizontal'">
              </pro-base-menu>
          </div>

          <ng-container [ngTemplateOutlet]="rightContentRender"
                        [ngTemplateOutletContext]="{ $implicit: {theme: theme,layout: 'topmenu'} }"></ng-container>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proTopNavHeader',
  preserveWhitespaces: false,
  host: {
    '[class]': `baseClassName`,
    '[class.light]': `theme === 'light'`
  }
})
export class TopNavHeaderComponent implements OnInit {

  @Input() theme: MenuTheme = 'light';
  @Input() menuData: MenuDataItem[];
  @Input() logo: TemplateRef<void> | string;
  @Input() title: TemplateRef<void> | string;
  @Input() contentWidth: ContentWidth;
  @Input() rightContentRender: TemplateRef<void>;
  @Input() menuHeaderRender: TemplateRef<void>;

  @Output() onMenuHeaderClick = new EventEmitter<any>();

  baseClassName = 'ant-pro-top-nav-header';

  maxWidth: number;

  constructor() {
  }

  ngOnInit() {
    const innerWidth = isBrowser() ? window.innerWidth : 0;

    this.maxWidth = (this.contentWidth === 'Fixed' && innerWidth > 1200 ? 1200 : innerWidth) - 280 - 120;
  }

  menuHeaderClick(event: Event) {
    this.onMenuHeaderClick.emit(event);
  }
}
