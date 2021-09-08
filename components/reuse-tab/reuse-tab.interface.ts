import {ActivatedRouteSnapshot, Params} from '@angular/router';

export interface ReuseTitle {
  name?: string;
  locale?: string;
}

export interface ReuseTabCached {
  title: ReuseTitle;
  url: string;
  /** 是否允许关闭，默认：`true` */
  closable?: boolean;
  /** 是否允许刷新，默认：`true` */
  refreshable?: boolean;
  /** 当前滚动条位置 */
  position?: [number, number] | null;
  _snapshot: ActivatedRouteSnapshot;
  _handle: ReuseComponentHandle;
}

export interface ReuseTabNotify {
  /** 事件类型 */
  active: 'add' | 'override' | 'title' | 'clear' | 'closable' | 'close' | 'closeRight' | 'move' | 'refresh';
  url?: string;
  queryParams?: Params;
  title?: ReuseTitle;
  item?: ReuseTabCached;
  list?: ReuseTabCached[];

  [key: string]: any;
}

export interface ReuseItem {
  url: string;
  queryParams: Params | null;
  title?: string;
  closable?: boolean;
  refreshable?: boolean;
  index?: number;
  active?: boolean;
  last?: boolean;
}

export interface ReuseContextEvent {
  event: MouseEvent;
  item: ReuseItem;
}

export type CloseType = 'close' | 'closeOther' | 'closeRight' | 'refresh' | null;

export interface ReuseContextCloseEvent {
  type: CloseType;
  item: ReuseItem;
  includeNonCloseable: boolean;
}

export interface ReuseComponentHandle {
  componentRef: ReuseComponentRef;
}

export interface ReuseComponentRef {
  instance: ReuseComponentInstance;
}

export type ReuseHookTypes = 'onReuseInit' | 'onReuseDestroy';

export type ReuseHookOnReuseInitType = 'init' | 'refresh';

export interface ReuseComponentInstance {
  /** 再次进入标签页时触发，有2中类型init和refresh **/
  onReuseInit: (type: ReuseHookOnReuseInitType) => void;
  /** 标签页离开时触发 **/
  onReuseDestroy: () => void;
  destroy: () => void;
}
