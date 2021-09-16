import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ACLService, ACLType} from '@delon/acl';

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
  external?: boolean; // 通过新标签打开外部连接
  externalClick?: (menuDataItem: MenuDataItem) => void; // 自定义如何打开外部连接
  children?: MenuDataItem[];

  [key: string]: any;
}

@Component({
  selector: 'pro-base-menu',
  templateUrl: 'base-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proBaseMenu',
  preserveWhitespaces: false
})
export class BaseMenuComponent implements OnInit, AfterViewInit {

  @Input() style: { [key: string]: string };
  @Input() mode = 'inline';
  @Input() menuData: MenuDataItem[];
  @Input() theme = 'dark';
  @Input() collapsed: boolean;
  /** @deprecated */
  @Input() selectedKey: string;
  @Input() openKeys: Set<string> = new Set<string>();
  @Output() openChange: EventEmitter<any> = new EventEmitter();

  constructor(private aclService: ACLService,
              private cdf: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.aclService.change.subscribe((change: ACLType | boolean | null) => {
      if (change) {
        this.cdf.markForCheck();
      }
    })
  }

  ngOnInit(): void {
    // console.log(this.menuData);
  }

  onOpenChange(status, menuData) {
    this.openChange.emit({status, item: menuData});
  }
}
