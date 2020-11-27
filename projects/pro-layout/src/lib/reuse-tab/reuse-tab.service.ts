import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable, Unsubscribable} from "rxjs";
import {
  ReuseComponentRef, ReuseHookOnReuseInitType, ReuseHookTypes,
  ReuseTabCached,
  ReuseTabNotify,
  ReuseTitle
} from "./reuse-tab.interface";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ExtraOptions, NavigationEnd,
  NavigationStart,
  Router,
  ROUTER_CONFIGURATION
} from "@angular/router";
import {ScrollService} from "./scroll.service";

@Injectable({
  providedIn: 'root'
})
export class ReuseTabService {

  private _inited = false;
  private _max = 500;
  private _keepingScroll = false;
  private _cachedChange = new BehaviorSubject<ReuseTabNotify | null>(null);
  private _cached: ReuseTabCached[] = [];
  private _titleCached: { [urlWithQueryParams: string]: ReuseTitle } = {};
  private _closableCached: { [urlWithQueryParams: string]: boolean } = {};
  private _router$: Unsubscribable;
  private removeUrlBuffer: string | null;
  private removeQueryParamBuffer: any;
  private positionBuffer: { [url: string]: [number, number] } = {};
  componentRef: ReuseComponentRef;
  debug = false;
  /** 排除规则，限 `mode=URL` */
  excludes: RegExp[] = [];

  private get snapshot(): ActivatedRouteSnapshot {
    return this.injector.get(ActivatedRoute).snapshot;
  }

  // #region public

  get inited(): boolean {
    return this._inited;
  }

  /** 当前路由地址 */
  get curUrl(): string {
    return this.getUrl(this.snapshot);
  }

  /** 当前路由跳转参数 **/
  get curQueryParams(): any {
    return this.snapshot.queryParams;
  }

  /** url和路由参数 **/
  get curUrlWithQueryParams(): string {
    const router = this.injector.get(Router);
    const urlWithQueryParams = router.serializeUrl(router.createUrlTree([this.curUrl], {queryParams: this.curQueryParams}));
    return urlWithQueryParams;
  }

  /** 允许最多复用多少个页面，取值范围 `2-500`，值发生变更时会强制关闭且忽略可关闭条件 */
  set max(value: number) {
    this._max = Math.min(Math.max(value, 2), 500);
    for (let i = this._cached.length; i > this._max; i--) {
      this._cached.pop();
    }
  }

  set keepingScroll(value: boolean) {
    this._keepingScroll = value;
    this.initScroll();
  }

  get keepingScroll(): boolean {
    return this._keepingScroll;
  }

  keepingScrollContainer: Element;

  /** 获取已缓存的路由 */
  get items(): ReuseTabCached[] {
    return this._cached;
  }

  /** 获取当前缓存的路由总数 */
  get count(): number {
    return this._cached.length;
  }

  /** 订阅缓存变更通知 */
  get change(): Observable<ReuseTabNotify | null> {
    return this._cachedChange.asObservable(); // .pipe(filter(w => w !== null));
  }

  /** 自定义当前标题 */
  set title(value: string | ReuseTitle) {
    const urlWithQueryParams = this.curUrlWithQueryParams;
    if (typeof value === 'string') value = {name: value};
    this._titleCached[urlWithQueryParams] = value;
    this.di('update current tag title: ', value);
    this._cachedChange.next({
      active: 'title',
      url: urlWithQueryParams,
      title: value,
      list: this._cached,
    });
  }

  /** 获取指定路径缓存所在位置，`-1` 表示无缓存 */
  index(url: string, queryParams: any): number {
    return this._cached.findIndex(w => w.url === url && this.queryParamsEqual(queryParams, w._snapshot.queryParams));
  }

  /** 获取指定路径缓存是否存在 */
  exists(url: string, queryParams: any): boolean {
    return this.index(url, queryParams) !== -1;
  }

  /** 获取指定路径缓存 */
  get(url: string, queryParams: any): ReuseTabCached | null {
    return this._cached.find(w => w.url === url && this.queryParamsEqual(queryParams, w._snapshot.queryParams)) || null;
  }

  private remove(url: string | number, queryParams: any, includeNonCloseable: boolean): boolean {
    const idx = typeof url === 'string' ? this.index(url, queryParams) : url;
    const item = idx !== -1 ? this._cached[idx] : null;
    if (!item || (!includeNonCloseable && !item.closable)) return false;

    this.destroy(item._handle);

    this._cached.splice(idx, 1);

    // 删除标题缓存
    const router = this.injector.get(Router);
    const urlWithQueryParams = router.serializeUrl(router.createUrlTree([item.url], {queryParams: item._snapshot.queryParams}));
    delete this._titleCached[urlWithQueryParams];
    return true;
  }

  /**
   * 常用于添加(修改)完成后关闭页面并跳转到列表页，并刷新列表页
   * @param toUrl
   * @param queryParams
   */
  closeCurAndToList(toUrl: string, queryParams: any) {
    const curUrl = this.curUrl;
    const curQueryParams = this.curQueryParams;
    this.injector.get<Router>(Router).navigate([toUrl], {queryParams: queryParams})
      .then(() => {
        // 刷新To列表页
        this.refreshPage(toUrl, queryParams);
        // 关闭Cur当前页
        this.close(curUrl, curQueryParams, true);
      });
  }

  /**
   * 刷新指定页面，页面需要实现Hook。
   * @param url: 全路径
   * @param queryParams
   */
  refreshPage(url: string, queryParams: any): void {
    const reuseTabCached: ReuseTabCached = this.get(url, queryParams);
    if (reuseTabCached) {
      this.runHook('onReuseInit', reuseTabCached._handle.componentRef, "refresh");
    }
  }

  /**
   * 根据URL移除标签
   *
   * @param [includeNonCloseable=false] 是否强制包含不可关闭
   */
  close(url: string, queryParams: any, includeNonCloseable: boolean = false): boolean {
    this.removeUrlBuffer = url;
    this.removeQueryParamBuffer = queryParams;
    this.remove(url, queryParams, includeNonCloseable);
    this._cachedChange.next({active: 'close', url, queryParams, list: this._cached});
    this.di('close tag', url);
    return true;
  }

  /**
   * 清除右边
   *
   * @param [includeNonCloseable=false] 是否强制包含不可关闭
   */
  closeRight(url: string, queryParams: any, includeNonCloseable: boolean = false): boolean {
    const start = this.index(url, queryParams);
    for (let i = this.count - 1; i > start; i--) {
      this.remove(i, queryParams, includeNonCloseable);
    }
    this.removeUrlBuffer = null;
    this.removeQueryParamBuffer = {};
    this._cachedChange.next({active: 'closeRight', url, queryParams, list: this._cached});
    this.di('close right tages', url);
    return true;
  }

  /**
   * 清除所有缓存
   *
   * @param [includeNonCloseable=false] 是否强制包含不可关闭
   */
  clear(includeNonCloseable: boolean = false): void {
    this._cached.forEach(w => {
      if (!includeNonCloseable && w.closable) this.destroy(w._handle);
    });
    this._cached = this._cached.filter(w => !includeNonCloseable && !w.closable);
    this.removeUrlBuffer = null;
    this.removeQueryParamBuffer = {};
    this._cachedChange.next({active: 'clear', list: this._cached});
    this.di('clear all catch');
  }

  /**
   * 移动缓存数据
   * @param url 要移动的URL地址
   * @param position 新位置，下标从 `0` 开始
   *
   * @example
   * ```
   * // source
   * [ '/a/1', '/a/2', '/a/3', '/a/4', '/a/5' ]
   * move('/a/1', 2);
   * // output
   * [ '/a/2', '/a/3', '/a/1', '/a/4', '/a/5' ]
   * move('/a/1', -1);
   * // output
   * [ '/a/2', '/a/3', '/a/4', '/a/5', '/a/1' ]
   * ```
   */
  private move(url: string, queryParams: any, position: number): void {
    const start = this._cached.findIndex(w => w.url === url && this.queryParamsEqual(queryParams, w._snapshot.queryParams));
    if (start === -1) return;
    const data = this._cached.slice();
    data.splice(position < 0 ? data.length + position : position, 0, data.splice(start, 1)[0]);
    this._cached = data;
    this._cachedChange.next({
      active: 'move',
      url,
      queryParams,
      position,
      list: this._cached,
    });
  }

  /**
   * 强制关闭当前路由（包含不可关闭状态），并重新导航至 `newUrl` 路由
   */
  replace(newUrl: string, queryParams: any): void {
    const curUrl = this.curUrl;
    const curQueryParams = this.curQueryParams;
    if (this.exists(curUrl, curQueryParams)) {
      this.close(curUrl, curQueryParams, true);
    } else {
      this.removeUrlBuffer = curUrl;
      this.removeQueryParamBuffer = curQueryParams;
    }
    this.injector.get<Router>(Router).navigate([newUrl], {queryParams: queryParams}).then();
  }

  /**
   * 获取标题，顺序如下：
   *
   * 1. 组件内使用 `ReuseTabService.title = 'new title'` 重新指定文本
   * 2. 路由配置中 data 属性中包含 locale > name
   *
   * @param url 指定URL
   * @param route 指定路由快照
   */
  getTitle(url: string, route?: ActivatedRouteSnapshot): ReuseTitle {
    const router = this.injector.get(Router);
    const urlWithQueryParams = router.serializeUrl(router.createUrlTree([url], {queryParams: route.queryParams}));
    if (this._titleCached[urlWithQueryParams]) {
      return this._titleCached[urlWithQueryParams];
    }
    if (route && route.data && (route.data.name || route.data.locale)) {
      return {
        name: route.data.name,
        locale: route.data.locale,
      } as ReuseTitle;
    }
    return {name: '未命名'};
  }

  /**
   * 清除标题缓存
   */
  clearTitleCached(): void {
    this._titleCached = {};
  }

  /** 自定义当前 `closable` 状态 */
  set closable(value: boolean) {
    const urlWithQueryParams = this.curUrlWithQueryParams;
    this._closableCached[urlWithQueryParams] = value;
    this.di('update current tag closable: ', value);
    this._cachedChange.next({
      active: 'closable',
      closable: value,
      list: this._cached,
    });
  }

  /**
   * 获取 `closable` 状态，顺序如下：
   *
   * 1. 组件内使用 `ReuseTabService.closable = true` 重新指定 `closable` 状态
   * 2. 路由配置中 data 属性中包含 `reuseClosable`
   *
   * @param url 指定URL
   * @param route 指定路由快照
   */
  getClosable(url: string, route?: ActivatedRouteSnapshot): boolean {
    if (typeof this._closableCached[url] !== 'undefined') {
      const router = this.injector.get(Router);
      const urlWithQueryParams = router.serializeUrl(router.createUrlTree([url], {queryParams: route.queryParams}));
      return this._closableCached[urlWithQueryParams];
    }

    if (route && route.data && typeof route.data.reuseClosable === 'boolean') return route.data.reuseClosable;

    return true;
  }

  getRefreshable(url: string, route?: ActivatedRouteSnapshot) {
    if (route && route.data && typeof route.data.reuseRefreshable === 'boolean') return route.data.reuseClosable;

    return true;
  }

  /**
   * 清空 `closable` 缓存
   */
  clearClosableCached(): void {
    this._closableCached = {};
  }

  getTruthRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let next = route;
    while (next.firstChild) next = next.firstChild;
    return next;
  }

  /**
   * 根据快照获取URL地址
   */
  getUrl(route: ActivatedRouteSnapshot): string {
    let next = this.getTruthRoute(route);
    const segments: string[] = [];
    while (next) {
      segments.push(next.url.join('/'));
      next = next.parent!;
    }
    const url =
      '/' +
      segments
        .filter(i => i)
        .reverse()
        .join('/');
    return url;
  }

  /**
   * 检查快照是否允许被复用
   */
  can(route: ActivatedRouteSnapshot): boolean {
    const url = this.getUrl(route);
    if (url === this.removeUrlBuffer && this.queryParamsEqual(route.queryParams, this.removeQueryParamBuffer)) return false;

    if (route.data && typeof route.data.reuse === 'boolean') return route.data.reuse;

    return !this.isExclude(url);
  }

  isExclude(url: string): boolean {
    return this.excludes.findIndex(r => r.test(url)) !== -1;
  }

  /**
   * 刷新，触发一个 refresh 类型事件
   */
  refresh(data?: any): void {
    this._cachedChange.next({active: 'refresh', data});
  }

  // #endregion

  // #region privates

  private destroy(_handle: any): void {
    if (_handle && _handle.componentRef && _handle.componentRef.destroy) _handle.componentRef.destroy();
  }

  private di(...args: any[]): void {
    if (!this.debug) return;
    console.warn(...args);
  }

  // #endregion

  constructor(private injector: Injector) {
  }

  init(): void {
    this.initScroll();
    this._inited = true;
  }

  runHook(method: ReuseHookTypes, comp: ReuseComponentRef | number, type: ReuseHookOnReuseInitType = 'init'): void {
    // 非当前页
    if (typeof comp === 'number') {
      const item = this._cached[comp];
      comp = item._handle.componentRef;
    }
    const compThis = comp.instance;
    if (comp == null || !compThis) {
      return;
    }
    const fn = compThis[method];
    if (typeof fn !== 'function') {
      return;
    }
    if (method === 'onReuseInit') {
      fn.call(compThis, type);
    } else {
      (fn as () => void).call(compThis);
    }
  }

  private hasInValidRoute(route: ActivatedRouteSnapshot): boolean {
    return !route.routeConfig || !!route.routeConfig.loadChildren || !!route.routeConfig.children;
  }

  /**
   * 决定是否允许路由复用，若 `true` 会触发 `store`
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (this.hasInValidRoute(route)) return false;
    const ret = this.can(route);
    this.di('#shouldDetach', ret, this.getUrl(route));
    return ret;
  }

  /**
   * 存储
   */
  store(_snapshot: ActivatedRouteSnapshot, _handle: any): void {
    const url = this.getUrl(_snapshot);
    const idx = this.index(url, _snapshot.queryParams);
    const isAdd = idx === -1;

    const item: ReuseTabCached = {
      title: this.getTitle(url, _snapshot),
      closable: this.getClosable(url, _snapshot),
      refreshable: this.getRefreshable(url, _snapshot),
      position: this.getKeepingScroll(url, _snapshot) ? this.positionBuffer[url] : null,
      url,
      _snapshot,
      _handle,
    };
    if (isAdd) {
      if (this.count >= this._max) {
        // Get the oldest closable location
        const closeIdx = this._cached.findIndex(w => w.closable!);
        if (closeIdx !== -1) this.remove(closeIdx, {}, false);
      }
      this._cached.push(item);
    } else {
      if (_handle) {
        this._cached[idx] = item;
      }
    }
    this.removeUrlBuffer = null;
    this.removeQueryParamBuffer = {};
    this.di('#store', isAdd ? '[new]' : '[override]', url);

    if (_handle && _handle.componentRef) {
      this.runHook('onReuseDestroy', _handle.componentRef);
    }

    if (!isAdd) {
      this._cachedChange.next({active: 'override', item, list: this._cached});
    }
  }

  /**
   * 决定是否允许应用缓存数据
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (this.hasInValidRoute(route)) return false;
    const url = this.getUrl(route);
    const data = this.get(url, route.queryParams);
    const ret = !!(data && data._handle);
    this.di('#shouldAttach', ret, url);
    if (ret) {
      const compRef = data!._handle.componentRef;
      if (compRef) {
        this.componentRef = compRef;
        this.runHook('onReuseInit', compRef);
      }
    } else {
      this._cachedChange.next({active: 'add', url, queryParams: route.queryParams, list: this._cached});
    }
    return ret;
  }

  /**
   * 提取复用数据
   */
  retrieve(route: ActivatedRouteSnapshot): {} | null {
    if (this.hasInValidRoute(route)) return null;
    const url = this.getUrl(route);
    const data = this.get(url, route.queryParams);
    const ret = (data && data._handle) || null;
    this.di('#retrieve', url, ret);
    return ret;
  }

  /**
   * 决定是否应该进行复用路由处理
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    let ret = future.routeConfig === curr.routeConfig;
    if (!ret) return false;

    const path = ((future.routeConfig && future.routeConfig.path) || '') as string;
    if (path.length > 0) {
      // if (this.routeParamMatchMode === 'strict') {
      //   ret = this.getUrl(future) === this.getUrl(curr);
      // } else {
      //   ret = path === ((curr.routeConfig && curr.routeConfig.path) || '');
      // }
      ret = this.getUrl(future) === this.getUrl(curr) && this.queryParamsEqual(future.queryParams, curr.queryParams);
    }
    this.di('=====================');
    this.di('#shouldReuseRoute', ret, `${this.getUrl(curr)}=>${this.getUrl(future)}`, future, curr);
    return ret;
  }

  // #region scroll

  /**
   * 获取 `keepingScroll` 状态，顺序如下：
   *
   * 1. 路由配置中 data 属性中包含 `keepingScroll`
   * 2. 组件 `keepingScroll` 值
   */
  getKeepingScroll(url: string, route?: ActivatedRouteSnapshot): boolean {
    if (route && route.data && typeof route.data.reuseKeepingScroll === 'boolean') return route.data.reuseKeepingScroll;

    return this.keepingScroll;
  }

  private get isDisabledInRouter(): boolean {
    const routerConfig = this.injector.get<ExtraOptions>(ROUTER_CONFIGURATION, {} as any);
    return routerConfig.scrollPositionRestoration === 'disabled';
  }

  private get ss(): ScrollService {
    return this.injector.get(ScrollService);
  }

  private initScroll(): void {
    if (this._router$) {
      this._router$.unsubscribe();
    }

    this._router$ = this.injector.get<Router>(Router).events.subscribe(e => {
      if (e instanceof NavigationStart) {
        const url = this.curUrl;
        if (this.getKeepingScroll(url, this.getTruthRoute(this.snapshot))) {
          this.positionBuffer[url] = this.ss.getScrollPosition(this.keepingScrollContainer);
        } else {
          delete this.positionBuffer[url];
        }
      } else if (e instanceof NavigationEnd) {
        const url = this.curUrl;
        const item = this.get(url, this.snapshot.queryParams);
        if (item && item.position && this.getKeepingScroll(url, this.getTruthRoute(this.snapshot))) {
          if (this.isDisabledInRouter) {
            this.ss.scrollToPosition(this.keepingScrollContainer, item.position);
          } else {
            setTimeout(() => this.ss.scrollToPosition(this.keepingScrollContainer, item.position!), 1);
          }
        }
      }
    });
  }

  /**
   * 比较url查询参数
   * @param queryParams1
   * @param queryParams2
   */
  queryParamsEqual(queryParams1: any, queryParams2: any): boolean {
    return JSON.stringify(queryParams1) === JSON.stringify(queryParams2)
  }

  // #endregion

  ngOnDestroy(): void {
    const {_cachedChange, _router$} = this;
    this.clear();
    this._cached = [];
    _cachedChange.complete();

    if (_router$) {
      _router$.unsubscribe();
    }
  }
}
