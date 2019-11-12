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
import {MenuDataItem} from "../sider-menu/base-menu.component";

@Component({
  selector: 'pro-top-nav-header',
  templateUrl: 'top-nav-header.component.html',
  styleUrls: ['top-nav-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proTopNavHeader',
  preserveWhitespaces: false
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
