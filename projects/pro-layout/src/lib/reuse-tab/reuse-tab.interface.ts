import {ActivatedRouteSnapshot, Params} from '@angular/router';

export type ReuseTabRouteParamMatchMode = 'strict' | 'loose';

export interface ReuseTitle {
  name?: string;
  locale?: string;
}

export interface ReuseTabCached {
  title: ReuseTitle;

  url: string;

  /** 是否允许关闭，默认：`true` */
  closable?: boolean;

  /** 当前滚动条位置 */
  position?: [number, number] | null;

  _snapshot: ActivatedRouteSnapshot;

  _handle: ReuseComponentHandle;
}

export interface ReuseTabNotify {
  /** 事件类型 */
  active: 'add' | 'override' | 'title' | 'clear' | 'closable' | 'close' | 'closeRight' | 'move' | 'refresh';
  url?: string;
  title?: ReuseTitle;
  item?: ReuseTabCached;
  list?: ReuseTabCached[];

  [key: string]: any;
}

export interface ReuseItem {
  url: string;
  queryParams: Params | null;
  title: string;
  closable: boolean;
  index: number;
  active: boolean;
  last: boolean;
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

export type ReuseHookTypes = '_onReuseInit' | '_onReuseDestroy';

export type ReuseHookOnReuseInitType = 'init' | 'refresh';

export interface ReuseComponentInstance {
  _onReuseInit: (type: ReuseHookOnReuseInitType) => void;
  _onReuseDestroy: () => void;
  destroy: () => void;
}
