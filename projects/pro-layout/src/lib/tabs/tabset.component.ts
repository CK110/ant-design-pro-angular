/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {coerceNumberProperty} from '@angular/cdk/coercion';
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkWithHref} from '@angular/router';

import {merge, Observable, of, Subject, Subscription} from 'rxjs';
import {delay, filter, first, startWith, takeUntil} from 'rxjs/operators';



import {
  NzAnimatedInterface,
  NzTabChangeEvent,
  NzTabPosition,
  NzTabPositionMode,
  NzTabsCanDeactivateFn,
  NzTabScrollEvent,
  NzTabType
} from './interfaces';
import {ProTabNavBarComponent} from './tab-nav-bar.component';
import {ProTabComponent, PRO_TAB_SET} from './tab.component';
import {NzSizeLDSType} from "ng-zorro-antd/core/types";
import {InputBoolean} from "ng-zorro-antd/core/util";
import {PREFIX, warnDeprecation} from "ng-zorro-antd/core/logger";


let nextId = 0;

@Component({
  selector: 'pro-tabset',
  exportAs: 'proTabset',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: PRO_TAB_SET,
      useExisting: ProTabSetComponent
    }
  ],
  template: `
      <pro-tabs-nav
              *ngIf="tabs.length"
              [ngStyle]="nzTabBarStyle"
              [selectedIndex]="nzSelectedIndex || 0"
              [inkBarAnimated]="inkBarAnimated"
              [addable]="addable"
              [addIcon]="nzAddIcon"
              [hideBar]="nzHideAll"
              [position]="position"
              [extraTemplate]="nzTabBarExtraContent"
              (tabScroll)="nzTabListScroll.emit($event)"
              (selectFocusedIndex)="setSelectedIndex($event)"
              (addClicked)="onAdd()"
      >
          <div
                  class="ant-pro-tabs-tab"
                  [style.margin-right.px]="position === 'horizontal' ? nzTabBarGutter : null"
                  [style.margin-bottom.px]="position === 'vertical' ? nzTabBarGutter : null"
                  [class.ant-pro-tabs-tab-active]="nzSelectedIndex === i"
                  [class.ant-pro-tabs-tab-disabled]="tab.nzDisabled"
                  (click)="clickNavItem(tab, i)"
                  (contextmenu)="contextmenuNavItem(tab, $event)"
                  *ngFor="let tab of tabs; let i = index"
          >
              <div
                      role="tab"
                      [attr.tabIndex]="getTabIndex(tab, i)"
                      [attr.aria-disabled]="tab.nzDisabled"
                      [attr.aria-selected]="nzSelectedIndex === i && !nzHideAll"
                      [attr.aria-controls]="getTabContentId(i)"
                      [disabled]="tab.nzDisabled"
                      [tab]="tab"
                      [active]="nzSelectedIndex === i"
                      class="ant-pro-tabs-tab-btn"
                      ProTabNavItem
                      cdkMonitorElementFocus
              >
                  <ng-container
                          *nzStringTemplateOutlet="tab.label; context: { visible: true }">{{ tab.label }}</ng-container>
                  <button
                          pro-tab-close-button
                          *ngIf="tab.nzClosable && closable && !tab.nzDisabled"
                          [closeIcon]="tab.nzCloseIcon"
                          (click)="onClose(i, $event)"
                  ></button>
              </div>
          </div>
      </pro-tabs-nav>
      <div class="ant-pro-tabs-content-holder">
          <div
                  class="ant-pro-tabs-content"
                  [class.ant-pro-tabs-content-top]="nzTabPosition === 'top'"
                  [class.ant-pro-tabs-content-bottom]="nzTabPosition === 'bottom'"
                  [class.ant-pro-tabs-content-left]="nzTabPosition === 'left'"
                  [class.ant-pro-tabs-content-right]="nzTabPosition === 'right'"
                  [class.ant-pro-tabs-content-animated]="tabPaneAnimated"
                  [style.margin-left.%]="tabPaneAnimated ? -(nzSelectedIndex || 0) * 100 : null"
          >
              <div
                      pro-tab-body
                      *ngFor="let tab of tabs; let i = index"
                      [active]="nzSelectedIndex == i && !nzHideAll"
                      [content]="tab.content"
                      [forceRender]="tab.nzForceRender"
                      [tabPaneAnimated]="tabPaneAnimated"
              ></div>
          </div>
      </div>
  `,
  host: {
    class: 'ant-pro-tabs',
    '[class.ant-pro-tabs-card]': `nzType === 'card' || nzType === 'editable-card'`,
    '[class.ant-pro-tabs-editable]': `nzType === 'editable-card'`,
    '[class.ant-pro-tabs-editable-card]': `nzType === 'editable-card'`,
    '[class.ant-pro-tabs-centered]': `nzCentered`,
    '[class.ant-pro-tabs-top]': `nzTabPosition === 'top'`,
    '[class.ant-pro-tabs-bottom]': `nzTabPosition === 'bottom'`,
    '[class.ant-pro-tabs-left]': `nzTabPosition === 'left'`,
    '[class.ant-pro-tabs-right]': `nzTabPosition === 'right'`,
    '[class.ant-pro-tabs-default]': `nzSize === 'default'`,
    '[class.ant-pro-tabs-small]': `nzSize === 'small'`,
    '[class.ant-pro-tabs-large]': `nzSize === 'large'`
  }
})
export class ProTabSetComponent implements OnInit, AfterContentChecked, OnDestroy, AfterContentInit, OnChanges {

  @Input()
  get nzSelectedIndex(): number | null {
    return this.selectedIndex;
  }

  set nzSelectedIndex(value: null | number) {
    this.indexToSelect = coerceNumberProperty(value, null);
  }

  @Input() nzTabPosition: NzTabPosition = 'top';
  @Input() nzTabBarExtraContent?: TemplateRef<void>;
  @Input() nzCanDeactivate: NzTabsCanDeactivateFn | null = null;
  @Input() nzAddIcon: string | TemplateRef<any> = 'plus';
  @Input() nzTabBarStyle: { [key: string]: string } | null = null;
  @Input() nzType: NzTabType = 'line';
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzAnimated: NzAnimatedInterface | boolean = true;
  @Input() nzTabBarGutter?: number = undefined;
  @Input() @InputBoolean() nzHideAdd: boolean = false;
  @Input() @InputBoolean() nzCentered: boolean = false;
  @Input() @InputBoolean() nzHideAll = false;
  @Input() @InputBoolean() nzLinkRouter = false;
  @Input() @InputBoolean() nzLinkExact = true;

  @Output() readonly nzSelectChange: EventEmitter<NzTabChangeEvent> = new EventEmitter<NzTabChangeEvent>(true);
  @Output() readonly nzSelectedIndexChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly nzTabListScroll = new EventEmitter<NzTabScrollEvent>();
  @Output() readonly nzClose = new EventEmitter<{ index: number }>();
  @Output() readonly nzAdd = new EventEmitter<void>();

  /**
   * @deprecated Not supported.
   * @breaking-change 11.0.0
   */
  @Input() @InputBoolean() nzShowPagination = true;
  /**
   * @deprecated Not supported.
   * @breaking-change 11.0.0
   */
  @Output() readonly nzOnNextClick = new EventEmitter<void>();
  /**
   * @deprecated Not supported.
   * @breaking-change 11.0.0
   */
  @Output() readonly nzOnPrevClick = new EventEmitter<void>();

  get position(): NzTabPositionMode {
    return ['top', 'bottom'].indexOf(this.nzTabPosition) === -1 ? 'vertical' : 'horizontal';
  }

  get addable(): boolean {
    return this.nzType === 'editable-card' && !this.nzHideAdd;
  }

  get closable(): boolean {
    return this.nzType === 'editable-card';
  }

  get line(): boolean {
    return this.nzType === 'line';
  }

  get inkBarAnimated(): boolean {
    return this.line && (typeof this.nzAnimated === 'boolean' ? this.nzAnimated : this.nzAnimated.inkBar);
  }

  get tabPaneAnimated(): boolean {
    return (
      this.position === 'horizontal' && this.line && (typeof this.nzAnimated === 'boolean' ? this.nzAnimated : this.nzAnimated.tabPane)
    );
  }

  // Pick up only direct descendants under ivy rendering engine
  // We filter out only the tabs that belong to this tab set in `tabs`.
  @ContentChildren(ProTabComponent, {descendants: true}) allTabs: QueryList<ProTabComponent> = new QueryList<ProTabComponent>();
  @ViewChild(ProTabNavBarComponent) tabNavBarRef!: ProTabNavBarComponent;

  // All the direct tabs for this tab set
  tabs: QueryList<ProTabComponent> = new QueryList<ProTabComponent>();

  private readonly tabSetId!: number;
  private destroy$ = new Subject<void>();
  private indexToSelect: number | null = 0;
  private selectedIndex: number | null = null;
  private tabLabelSubscription = Subscription.EMPTY;
  private tabsSubscription = Subscription.EMPTY;
  private canDeactivateSubscription = Subscription.EMPTY;

  constructor(private cdr: ChangeDetectorRef, @Optional() private router: Router) {
    this.tabSetId = nextId++;
  }

  ngOnInit(): void {
    if (this.nzOnNextClick.observers.length) {
      warnDeprecation(`(nzOnNextClick) of pro-tabset is not support, will be removed in 11.0.0`);
    }
    if (this.nzOnPrevClick.observers.length) {
      warnDeprecation(`(nzOnPrevClick) of pro-tabset is not support, will be removed in 11.0.0`);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.tabs.destroy();
    this.tabLabelSubscription.unsubscribe();
    this.tabsSubscription.unsubscribe();
    this.canDeactivateSubscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    Promise.resolve().then(() => {
      this.setUpRouter();
    });
    this.subscribeToTabLabels();
    this.subscribeToAllTabChanges();

    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this.tabsSubscription = this.tabs.changes.subscribe(() => {
      const indexToSelect = this.clampTabIndex(this.indexToSelect);

      // Maintain the previously-selected tab if a new tab is added or removed and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this.selectedIndex) {
        const tabs = this.tabs.toArray();

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            // Assign both to the `indexToSelect` and `selectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a tab within the `nzSelectedIndexChange` event.
            this.indexToSelect = this.selectedIndex = i;
            break;
          }
        }
      }
      this.subscribeToTabLabels();
      this.cdr.markForCheck();
    });
  }

  ngAfterContentChecked(): void {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of tabs changes before the actual change detection runs.
    const indexToSelect = (this.indexToSelect = this.clampTabIndex(this.indexToSelect));

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this.selectedIndex !== indexToSelect) {
      const isFirstRun = this.selectedIndex == null;

      if (!isFirstRun) {
        this.nzSelectChange.emit(this.createChangeEvent(indexToSelect));
      }

      // Changing these values after change detection has run
      // since the checked content may contain references to them.
      Promise.resolve().then(() => {
        this.tabs.forEach((tab, index) => (tab.isActive = index === indexToSelect));

        if (!isFirstRun) {
          this.nzSelectedIndexChange.emit(indexToSelect);
        }
      });
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this.tabs.forEach((tab: ProTabComponent, index: number) => {
      tab.position = index - indexToSelect;

      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this.selectedIndex != null && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this.selectedIndex;
      }
    });

    if (this.selectedIndex !== indexToSelect) {
      this.selectedIndex = indexToSelect;
      this.cdr.markForCheck();
    }
  }

  onClose(index: number, e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.nzClose.emit({index});
  }

  onAdd(): void {
    this.nzAdd.emit();
  }

  private clampTabIndex(index: number | null): number {
    return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
  }

  private createChangeEvent(index: number): NzTabChangeEvent {
    const event = new NzTabChangeEvent();
    event.index = index;
    if (this.tabs && this.tabs.length) {
      event.tab = this.tabs.toArray()[index];
      this.tabs.forEach((tab, i) => {
        if (i !== index) {
          tab.nzDeselect.emit();
        }
      });
      event.tab.nzSelect.emit();
    }
    return event;
  }

  private subscribeToTabLabels(): void {
    if (this.tabLabelSubscription) {
      this.tabLabelSubscription.unsubscribe();
    }

    this.tabLabelSubscription = merge(...this.tabs.map(tab => tab.stateChanges)).subscribe(() => this.cdr.markForCheck());
  }

  private subscribeToAllTabChanges(): void {
    this.allTabs.changes.pipe(startWith(this.allTabs)).subscribe((tabs: QueryList<ProTabComponent>) => {
      this.tabs.reset(tabs.filter(tab => tab.closestTabSet === this));
      this.tabs.notifyOnChanges();
    });
  }

  canDeactivateFun(pre: number, next: number): Observable<boolean> {
    return of(true);
  }

  clickNavItem(tab: ProTabComponent, index: number): void {
    if (!tab.nzDisabled) {
      // ignore nzCanDeactivate
      tab.nzClick.emit();
      this.setSelectedIndex(index);
    }
  }

  contextmenuNavItem(tab: ProTabComponent, e: MouseEvent): void {
    if (!tab.nzDisabled) {
      // ignore nzCanDeactivate
      tab.nzContextmenu.emit(e);
    }
  }

  setSelectedIndex(index: number): void {
    this.canDeactivateSubscription.unsubscribe();
    this.canDeactivateSubscription = this.canDeactivateFun(this.selectedIndex!, index).subscribe(can => {
      if (can) {
        this.nzSelectedIndex = index;
        this.tabNavBarRef.focusIndex = index;
        this.cdr.markForCheck();
      }
    });
  }

  getTabIndex(tab: ProTabComponent, index: number): number | null {
    if (tab.nzDisabled) {
      return null;
    }
    return this.selectedIndex === index ? 0 : -1;
  }

  getTabContentId(i: number): string {
    return `pro-tabs-${this.tabSetId}-tab-${i}`;
  }

  private setUpRouter(): void {
    if (this.nzLinkRouter) {
      if (!this.router) {
        throw new Error(`${PREFIX} you should import 'RouterModule' if you want to use 'nzLinkRouter'!`);
      }
      this.router.events
        .pipe(
          takeUntil(this.destroy$),
          filter(e => e instanceof NavigationEnd),
          startWith(true),
          delay(0)
        )
        .subscribe(() => {
          this.updateRouterActive();
          this.cdr.markForCheck();
        });
    }
  }

  private updateRouterActive(): void {
    if (this.router.navigated) {
      const index = this.findShouldActiveTabIndex();
      if (index !== this.selectedIndex) {
        this.setSelectedIndex(index);
        this.nzSelectedIndexChange.emit(index);
      }
      this.nzHideAll = index === -1;
    }
  }

  private findShouldActiveTabIndex(): number {
    const tabs = this.tabs.toArray();
    const isActive = this.isLinkActive(this.router);

    return tabs.findIndex(tab => {
      const c = tab.linkDirective;
      return c ? isActive(c.routerLink) || isActive(c.routerLinkWithHref) : false;
    });
  }

  private isLinkActive(router: Router): (link?: RouterLink | RouterLinkWithHref) => boolean {
    return (link?: RouterLink | RouterLinkWithHref) => (link ? router.isActive(link.urlTree, this.nzLinkExact) : false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzShowPagination')) {
      warnDeprecation(`[nzOnPrevClick] of pro-tabset is not support, will be removed in 11.0.0`);
    }
  }
}
