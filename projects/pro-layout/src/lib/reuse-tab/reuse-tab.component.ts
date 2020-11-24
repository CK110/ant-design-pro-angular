import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter, Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChange, SimpleChanges,
  TemplateRef,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import {InputBoolean, InputNumber} from "ng-zorro-antd";
import {Subject} from "rxjs";
import {
  ReuseContextCloseEvent,
  ReuseItem,
  ReuseTabCached,
  ReuseTabNotify,
  ReuseTitle
} from "./reuse-tab.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {ReuseTabService} from "./reuse-tab.service";
import {debounceTime, takeUntil} from "rxjs/operators";
import {ReuseTabMenuService} from "./reuse-tab-menu.service";
import {ProTabSetComponent} from "../tabs";

@Component({
  selector: 'pro-reuse-tab',
  templateUrl: 'reuse-tab.component.html',
  styleUrls: ['reuse-tab.component.less'],
  host: {
    '[class.ant-pro-reuse-tab]': 'true',
    '[class.ant-pro-reuse-tab-line]': 'true',
  },
  providers: [ReuseTabMenuService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proReuseTab',
  preserveWhitespaces: false
})
export class ReuseTabComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('tabset', {static: true}) private tabset: ProTabSetComponent;
  private unsubscribe$ = new Subject<void>();
  private updatePos$ = new Subject<void>();
  private _keepingScrollContainer: Element;
  list: ReuseItem[] = [];
  item: ReuseItem;
  pos = 0;

  // #region fields
  @Input() @InputBoolean() debug = false;
  @Input() @InputNumber() max: number;
  @Input() @InputNumber() tabMaxWidth: number;
  @Input() excludes: RegExp[];
  @Input() @InputBoolean() allowClose = true;
  @Input() @InputBoolean() allowRefresh = true;
  @Input() @InputBoolean() keepingScroll = false;

  @Input()
  set keepingScrollContainer(value: string | Element) {
    this._keepingScrollContainer = typeof value === 'string' ? this.doc.querySelector(value) : value;
  }

  @Input() tabBarExtraContent: TemplateRef<void>;
  @Input() tabBarGutter: number;
  @Input() tabBarStyle: { [key: string]: string };
  @Output() readonly change = new EventEmitter<ReuseItem>();
  @Output() readonly close = new EventEmitter<ReuseItem | null>();

  // #endregion

  constructor(private reuseTabService: ReuseTabService,
              private reuseTabContextService: ReuseTabMenuService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              @Inject(DOCUMENT) private doc: any) {
  }

  private genTit(title: ReuseTitle): string {
    return title.name;
  }

  private get curUrl(): string {
    return this.reuseTabService.getUrl(this.route.snapshot);
  }

  private get curUrlQueryParam(): any {
    return this.route.snapshot.queryParams;
  }

  private genCurItem(): ReuseItem {
    const url = this.curUrl;
    const snapshotTrue = this.reuseTabService.getTruthRoute(this.route.snapshot);
    return {
      url,
      queryParams: snapshotTrue.queryParams,
      title: this.genTit(this.reuseTabService.getTitle(url, snapshotTrue)),
      closable: this.allowClose && this.reuseTabService.count > 0 && this.reuseTabService.getClosable(url, snapshotTrue),
      refreshable: this.allowRefresh && this.reuseTabService.getRefreshable(url, snapshotTrue),
      active: false,
      last: false,
      index: 0,
    };
  }

  private genList(notify: ReuseTabNotify | null): void {
    const ls = this.reuseTabService.items.map(
      (item: ReuseTabCached, index: number) =>
        ({
          url: item.url,
          queryParams: item._snapshot.queryParams,
          title: this.genTit(item.title),
          closable: this.allowClose && item.closable && this.reuseTabService.count > 0,
          refreshable: this.allowRefresh && item.refreshable,
          index: index,
          active: false,
          last: false,
        } as ReuseItem),
    );

    const url = this.curUrl;
    let addCurrent = ls.findIndex(w => w.url === url && this.reuseTabService.queryParamsEqual(w.queryParams, this.curUrlQueryParam)) === -1;
    if (notify && notify.active === 'close' && notify.url === url) {
      addCurrent = false;
      let toPos = 0;
      const curItem = this.list.find(w => w.url === url && this.reuseTabService.queryParamsEqual(w.queryParams, this.curUrlQueryParam))!;
      if (curItem.index === ls.length) {
        // When closed is last
        toPos = ls.length - 1;
      } else if (curItem.index < ls.length) {
        // Should be actived next tab when closed is middle
        toPos = Math.max(0, curItem.index);
      }
      this.router.navigate([ls[toPos].url], {queryParams: ls[toPos].queryParams});
    }

    if (addCurrent) {
      ls.push(this.genCurItem());
    }

    ls.forEach((item, index) => (item.index = index));
    if (ls.length === 1) {
      ls[0].closable = false;
    }
    this.list = ls;
    this.cdr.detectChanges();
    this.updatePos$.next();
  }

  private updateTitle(res: ReuseTabNotify): void {
    const item = this.list.find(w => {
      const urlWithParams = this.router.serializeUrl(this.router.createUrlTree([w.url], {queryParams: w.queryParams}));
      return urlWithParams === res.url
    });
    if (!item) return;
    item.title = this.genTit(res!.title!);
    console.log(this.list);
    this.cdr.detectChanges();
  }

  private refresh(item: ReuseItem): void {
    this.reuseTabService.runHook('onReuseInit', this.pos === item.index ? this.reuseTabService.componentRef : item.index, 'refresh');
  }

  // #region UI

  contextMenuChange(res: ReuseContextCloseEvent): void {
    let fn: (() => void) | null = null;
    switch (res.type) {
      case 'refresh':
        this.refresh(res.item);
        break;
      case 'close':
        this._close(null, res.item.index, res.includeNonCloseable);
        break;
      case 'closeRight':
        fn = () => {
          this.reuseTabService.closeRight(res.item.url, res.item.queryParams, res.includeNonCloseable);
          this.close.emit(null);
        };
        break;
      case 'closeOther':
        fn = () => {
          this.reuseTabService.clear(res.includeNonCloseable);
          this.close.emit(null);
        };
        break;
    }
    if (!fn) {
      return;
    }
    if (!res.item.active && res.item.index <= this.list.find(w => w.active)!.index) {
      this._to(res.item.index, fn);
    } else {
      fn();
    }
  }

  _to(index: number, cb?: () => void): void {
    index = Math.max(0, Math.min(index, this.list.length - 1));
    const item = this.list[index];
    this.router.navigate([item.url], {queryParams: item.queryParams}).then(res => {
      if (!res) return;
      this.item = item;
      this.change.emit(item);
      if (cb) {
        cb();
      }
      this.cdr.detectChanges();
    });
  }

  _close(e: Event | null, idx: number, includeNonCloseable: boolean): boolean {
    if (e != null) {
      e.preventDefault();
      e.stopPropagation();
    }
    const item = this.list[idx];
    this.reuseTabService.close(item.url, item.queryParams, includeNonCloseable);
    this.close.emit(item);
    this.cdr.detectChanges();
    return false;
  }

  myClose(event) {
    const idx = event.index;
    this._close(null, idx, false);
  }

  activate(instance: any): void {
    this.reuseTabService.componentRef = {instance};
  }

  openMenu(event, item: ReuseItem): void {
    this.reuseTabContextService.show.next({
      event: event,
      item: item,
    });
    event.preventDefault();
    event.stopPropagation();
  }

  // #endregion

  ngOnInit(): void {
    this.updatePos$.pipe(takeUntil(this.unsubscribe$), debounceTime(50)).subscribe(() => {
      const url = this.reuseTabService.getUrl(this.route.snapshot);
      const ls = this.list.filter(w => w.url === url || !this.reuseTabService.isExclude(w.url));
      if (ls.length === 0) {
        return;
      }

      const last = ls[ls.length - 1];
      const item = ls.find(w => w.url === url && this.reuseTabService.queryParamsEqual(w.queryParams, this.route.snapshot.queryParams));
      last.last = true;
      const pos = item == null ? last.index : item.index;
      ls.forEach((i, idx) => (i.active = pos === idx));
      this.pos = pos;
      // TODO: 目前无法知道为什么 `pos` 无法通过 `nzSelectedIndex` 生效，因此强制使用组件实例的方式来修改，这种方式是安全的
      // https://github.com/ng-alain/ng-alain/issues/1736
      this.tabset.nzSelectedIndex = pos;
      this.list = ls;
      this.cdr.detectChanges();
    });

    // 路由缓存变化订阅
    this.reuseTabService.change.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      switch (res && res.active) {
        case 'title':
          if (this.list && this.list.length === 0) {
            this.genList(res);
          }
          this.updateTitle(res);
          return;
        case 'override':
          if (res && res.list && res.list.length === this.list.length) {
            this.updatePos$.next();
            return;
          }
          break;
      }
      this.genList(res);
    });

    this.reuseTabService.init();

    this.reuseTabContextService.show
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(context => this.reuseTabContextService.open(context));
    this.reuseTabContextService.close
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => this.contextMenuChange(res));
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.max) this.reuseTabService.max = this.max;
    if (changes.excludes) this.reuseTabService.excludes = this.excludes;
    if (changes.keepingScroll) {
      this.reuseTabService.keepingScroll = this.keepingScroll;
      this.reuseTabService.keepingScrollContainer = this._keepingScrollContainer;
    }

    this.reuseTabService.debug = this.debug;

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    const {unsubscribe$} = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
