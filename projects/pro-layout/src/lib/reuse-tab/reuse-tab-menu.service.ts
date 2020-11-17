import {ConnectionPositionPair, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ElementRef, Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {ReuseTabMenuComponent} from './reuse-tab-menu.component';
import {
  ReuseContextCloseEvent,
  ReuseContextEvent
} from './reuse-tab.interface';

@Injectable()
export class ReuseTabMenuService {
  private ref: OverlayRef | null;

  show: Subject<ReuseContextEvent> = new Subject<ReuseContextEvent>();
  close: Subject<ReuseContextCloseEvent> = new Subject<ReuseContextCloseEvent>();

  constructor(private overlay: Overlay) {
  }

  remove(): void {
    if (!this.ref) return;
    this.ref.detach();
    this.ref.dispose();
    this.ref = null;
  }

  open(context: ReuseContextEvent): void {
    this.remove();
    const {event, item} = context;
    const fakeElement = new ElementRef({
      getBoundingClientRect: (): ClientRect => ({
        bottom: event.clientY,
        height: 0,
        left: event.clientX,
        right: event.clientX,
        top: event.clientY,
        width: 0,
      }),
    });
    const positions = [
      new ConnectionPositionPair({originX: 'start', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'}),
      new ConnectionPositionPair({originX: 'start', originY: 'top'}, {overlayX: 'start', overlayY: 'bottom'}),
    ];
    const positionStrategy = this.overlay.position().flexibleConnectedTo(fakeElement).withPositions(positions);
    this.ref = this.overlay.create({
      positionStrategy,
      panelClass: 'ant-pro-reuse-tab-cm',
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });
    const comp = this.ref.attach(new ComponentPortal(ReuseTabMenuComponent));
    const instance = comp.instance;
    instance.item = {...item};
    instance.event = event;

    const sub$ = new Subscription();
    sub$.add(
      instance.close.subscribe((res: ReuseContextCloseEvent) => {
        this.close.next(res);
        this.remove();
      }),
    );
    comp.onDestroy(() => sub$.unsubscribe());
  }
}
