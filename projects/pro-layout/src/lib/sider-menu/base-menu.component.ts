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
export class BaseMenuComponent implements OnInit, AfterViewInit {

  @Input() style: { [key: string]: string };
  @Input() mode = 'inline';
  @Input() menuData: MenuDataItem[];
  @Input() theme = 'dark';
  @Input() collapsed: boolean;
  /** @deprecated */
  @Input() selectedKey: string;
  @Input() openKeys: Array<string> = [];
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
  }

  onOpenChange(status, menuData) {
    this.openChange.emit({status, item: menuData});
  }
}
