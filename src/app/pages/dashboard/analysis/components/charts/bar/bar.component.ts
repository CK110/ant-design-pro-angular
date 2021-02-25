import {AfterViewInit, Component, ElementRef, Input, NgZone, ViewChild} from '@angular/core';
import {inNextTick} from "ng-zorro-antd/core/util";

declare var G2;

@Component({
  selector: 'g2-bar',
  templateUrl: 'bar.component.html'
})
export class BarComponent implements AfterViewInit {

  @Input() title: string;
  color: string = 'rgba(24, 144, 255, 0.85)';
  padding: [number, number, number, number];
  @Input() height: number = 1;
  @Input() data: { x: string; y: number; }[];
  forceFit: boolean = true;
  autoLabel: boolean;
  style: { [key: string]: string; };

  @ViewChild('container', {static: true}) private container: ElementRef;

  constructor(private ngZone: NgZone) {
  }

  ngAfterViewInit() {
    inNextTick().subscribe(() => {
      this.renderChart();
    });
  }

  renderChart() {
    this.ngZone.runOutsideAngular(() => {
      const chart = new G2.Chart({
        container: this.container.nativeElement,
        height: this.title ? this.height - 41 : this.height,
        forceFit: this.forceFit,
        padding: this.padding || 'auto'
      });
      chart.source(this.data, {x: {type: 'cat'}, y: {min: 0}});
      // chart.axis('x', false);
      // chart.axis('y', false);
      chart.tooltip({
        showTitle: false,
      });
      chart.interval()
        .position('x*y')
        .color(this.color)
        .tooltip('x*y', (x: string, y: string) => ({name: x, value: y}));
      chart.render();
    })
  }
}
