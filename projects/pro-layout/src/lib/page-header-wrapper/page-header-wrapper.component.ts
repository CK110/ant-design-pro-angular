import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, Injector,
  Input, NgZone, OnDestroy,
  OnInit, Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { isNil } from 'ng-zorro-antd/core/util';
import {ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router} from '@angular/router';
import {filter, takeUntil, startWith} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ContentWidth} from '../core/default-settings';

export const ROUTE_DATA_BREADCRUMB_NAME = 'name';

export interface BreadcrumbOption {
  name?: string;
  locale?: string;
  icon?: string;
  path: string;
  params: Params;

  [key: string]: any;
}

export const DefaultLocation: BreadcrumbOption = {
  name: '首页',
  params: {},
  path: '/'
};

@Component({
  selector: 'pro-page-header-wrapper',
  templateUrl: 'page-header-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proPageHeaderWrapper',
  preserveWhitespaces: false
})
export class PageHeaderWrapperComponent implements OnInit, AfterViewInit, OnDestroy {

  // nz-page-header原有属性
  @Input() ghost = true;
  @Input() title: TemplateRef<void> | string;
  @Input() subtitle: TemplateRef<void> | string;
  @Input() backIcon: string | TemplateRef<void> | null = null;
  @Output() back = new EventEmitter<void>();

  @Input() extra: TemplateRef<void> | string;
  @Input() tags: TemplateRef<void>;
  @Input() content: TemplateRef<void> | string;
  @Input() extraContent: TemplateRef<void> | string;
  @Input() pageHeaderRender: TemplateRef<void>;
  @Input() location: BreadcrumbOption = DefaultLocation; // 首页

  @Input() tabList: { key: string; tab: string; }[];
  @Input() tabActiveKey: string;
  @Input() tabBarExtraContent: TemplateRef<void>;
  @Output() onTabChange: EventEmitter<{ key: string; tab: string; }> = new EventEmitter<{ key: string; tab: string; }>();

  @Input() contentWidth: ContentWidth;

  @ViewChild('contentTemplate', {static: true})
  private contentTemplate: ElementRef;

  prefixedClassName = 'ant-pro-page-header-wrap';

  breadcrumbs: BreadcrumbOption[] | undefined = [];

  private destroy$ = new Subject<void>();

  constructor(private renderer: Renderer2,
              private ngZone: NgZone,
              private cdr: ChangeDetectorRef,
              private injector: Injector) {
  }

  ngOnInit() {
    if (true) {
      this.registerRouterChange();
    }
    if (!this.title) {
      this.title = this.breadcrumbs[this.breadcrumbs.length - 1].name;
    }
  }

  ngAfterViewInit(): void {
    this.checkContent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkContent() {
    if (isNil(this.contentTemplate.nativeElement)) {
      this.renderer.setStyle(this.contentTemplate.nativeElement, 'display', 'none');
    } else {
      this.renderer.removeStyle(this.contentTemplate.nativeElement, 'display');
    }
  }

  navigate(path: string, e: MouseEvent): void {
    e.preventDefault();

    this.ngZone
      .run(() =>
        this.injector
          .get(Router)
          .navigateByUrl(path)
          .then()
      )
      .then();
  }

  private registerRouterChange(): void {
    try {
      const router = this.injector.get(Router);
      const activatedRoute = this.injector.get(ActivatedRoute);
      router.events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          takeUntil(this.destroy$),
          startWith(true) // Trigger initial render.
        )
        .subscribe(() => {
          this.breadcrumbs = this.getBreadcrumbs(activatedRoute.root, '', [this.location]);
          this.cdr.markForCheck();
        });
    } catch (e) {
      throw new Error(`You should import RouterModule.`);
    }
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    path: string = '',
    breadcrumbs: BreadcrumbOption[] = []
  ): BreadcrumbOption[] | undefined {
    const children: ActivatedRoute[] = route.children;
    // If there's no sub root, then stop the recurse and returns the generated breadcrumbs.
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      if (child.outlet === PRIMARY_OUTLET) {
        // Only parse components in primary router-outlet (in another word, router-outlet without a specific name).
        // Parse this layer and generate a breadcrumb item.
        const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
        const nextUrl = path + `/${routeURL}`;
        const breadcrumbName = child.snapshot.data[ROUTE_DATA_BREADCRUMB_NAME];
        // If have data, go to generate a breadcrumb for it.
        if (routeURL && breadcrumbName) {
          const breadcrumb: BreadcrumbOption = {
            name: breadcrumbName,
            params: child.snapshot.params,
            path: nextUrl
          };
          breadcrumbs.push(breadcrumb);
        }
        return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }
  }

  selectChange(event) {
    const selectedTab = this.tabList[event.index];
    this.onTabChange.emit(selectedTab);
  }

  getSelectedIndex() {
    const idx = this.tabList.findIndex(w => w.key === this.tabActiveKey);
    if (idx !== -1) {
      return idx;
    } else {
      return 0;
    }
  }
}
