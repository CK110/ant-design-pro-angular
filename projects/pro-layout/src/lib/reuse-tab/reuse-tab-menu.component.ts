import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {CloseType, ReuseContextCloseEvent, ReuseItem} from "./reuse-tab.interface";

@Component({
  selector: 'pro-reuse-tab-context-menu',
  template: `
      <ul nz-menu>
          <li nz-menu-item (click)="click($event, 'refresh')" data-type="refresh" [innerHTML]="'刷新'"></li>
          <li nz-menu-item (click)="click($event, 'close')" data-type="close" [nzDisabled]="!item.closable" [innerHTML]="'关闭'"></li>
          <li nz-menu-item (click)="click($event, 'closeOther')" data-type="closeOther" [innerHTML]="'关闭其他'"></li>
          <li nz-menu-item (click)="click($event, 'closeRight')" data-type="closeRight" [nzDisabled]="item.last" [innerHTML]="'关闭右侧'"></li>
      </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proReuseTabContextMenu',
  preserveWhitespaces: false
})
export class ReuseTabMenuComponent implements OnInit {

  @Input() item: ReuseItem;
  @Input() event: MouseEvent;
  @Output() readonly close = new EventEmitter<ReuseContextCloseEvent>();

  @HostListener('document:click', ['$event'])
  documentClick(event) {
    this.closeMenu(event);
  }

  @HostListener('document:contextmenu', ['$event'])
  documentContextmenu(event) {
    this.closeMenu(event);
  }

  get includeNonCloseable(): boolean {
    return this.event.ctrlKey;
  }

  constructor() {
  }

  ngOnInit(): void {
    if (this.includeNonCloseable) this.item.closable = true;
  }

  private notify(type: CloseType): void {
    this.close.next({
      type,
      item: this.item,
      includeNonCloseable: this.includeNonCloseable,
    });
  }

  click(e: MouseEvent, type: CloseType): void {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'close' && !this.item.closable) return;
    if (type === 'closeRight' && this.item.last) return;

    this.notify(type);
  }

  closeMenu(event: MouseEvent): void {
    if (event.type === 'click' && event.button === 2) return;
    this.notify(null);
  }
}
