import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ACLType} from "@delon/acl";

export interface RouterData {
  name?: string;
  locale?: string;
  guard?: ACLType;
  [key: string]: any;
}

export interface MenuDataItem {
  name?: string;
  icon?: string;
  locale?: string;
  path: string;
  guard?: ACLType;
  children?: MenuDataItem[];
  [key: string]: any;
}

@Component({
  selector: 'pro-base-menu',
  templateUrl: 'base-menu.component.html',
  styleUrls: ['base-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proBaseMenu',
  preserveWhitespaces: false
})
export class BaseMenuComponent {

  @Input() style: { [key: string]: string };
  @Input() mode = 'inline';
  @Input() menuData: MenuDataItem[];
  @Input() theme = 'dark';
  @Input() collapsed: boolean;
  @Input() selectedKey: string;
  @Input() openKeys: Array<string> = [];
  @Output() openChange: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  onOpenChange(status, menuData) {
    this.openChange.emit({status, item: menuData});
  }
}
