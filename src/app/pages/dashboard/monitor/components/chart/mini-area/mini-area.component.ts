import {AfterViewInit, Component, ElementRef, Input, NgZone, ViewChild} from '@angular/core';
import {inNextTick} from "ng-zorro-antd/core/util";
// @ts-ignore
import G2, {Chart} from '@antv/g2';

@Component({
  selector: 'app-mini-area',
  templateUrl: 'mini-area.component.html',
  styleUrls: ['mini-area.component.less']
})
export class MiniAreaComponent implements AfterViewInit {

  @Input() color: string = 'rgba(24, 144, 255, 0.2)';
  @Input() height: number = 1;
  @Input() borderColor: string;
  @Input() line: boolean;
  @Input() animate: boolean = true;
  @Input() xAxis: any;
  @Input() forceFit: boolean = true;
  @Input() scale: { x: { tickCount?: number }, y: { tickCount?: number } } = {x: {}, y: {}};
  @Input() yAxis: any;
  @Input() borderWidth: number = 2;
  @Input() data: { x: number | string; y: number }[] = [];

  @ViewChild('container', {static: true}) private container: ElementRef;
  chart: Chart;
  padding: [number, number, number, number] = [36, 5, 30, 5];

  constructor(private ngZone: NgZone) {
  }

  ngAfterViewInit() {
    inNextTick().subscribe(() => {
      this.renderChart();
    });
  }

  renderChart() {
    this.ngZone.runOutsideAngular(() => {
      const chart: Chart = new G2.Chart({
        container: this.container.nativeElement,
        animate: this.animate,
        scale: this.scale,
        height: this.height + 54,
        forceFit: this.forceFit,
        data: this.data,
        padding: this.padding
      });
      if (!this.xAxis && !this.yAxis) {
        chart.axis(false);
      }
      if (this.xAxis) {
        chart.axis('x', this.xAxis);
      } else {
        chart.axis('x', false);
      }

      if (this.yAxis) {
        chart.axis('y', this.yAxis);
      } else {
        chart.axis('y', false);
      }
      chart.tooltip({showTitle: false});
      chart
        .area()
        .position('x*y')
        .color(this.color)
        .tooltip('x*y', (x, y) => ({name: x, value: y}))
        .shape('smooth')
        .style({fillOpacity: 1,});
      if (this.line) {
        chart
          .line()
          .position('x*y')
          .shape('smooth')
          .color(this.borderColor)
          .size(this.borderWidth)
          .tooltip(false);
      }
      chart.render();
      this.chart = chart;
    })
  }
}
