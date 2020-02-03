import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, NgZone,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Chart} from '@antv/g2';
import {inNextTick} from "ng-zorro-antd";

declare var G2;

@Component({
  selector: 'app-g2-radar',
  templateUrl: 'radar.component.html',
  host: {
    '[class.radar]': 'true',
    '[style.height.px]': 'height',
  },
})
export class RadarComponent implements AfterViewInit {

  @Input() title: string | TemplateRef<void>;
  @Input() height: number;
  @Input() padding: [number, number, number, number] = [35, 30, 16, 30];
  @Input() hasLegend: boolean = false;
  @Input() data: { name: string; label: string; value: string | number; }[];
  @Input() colors: string[];
  @Input() animate: boolean = true;
  @Input() forceFit: boolean = true;
  @Input() tickCount: number = 5;
  @Input() style: { [key: string]: string };

  @ViewChild('container', {static: true}) private container: ElementRef;
  chart: Chart;
  legendData: { checked: boolean; name: string; color: string; percent: number; value: string; }[] = [];

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
        height: this.height - (this.hasLegend ? 80 : 22),
        forceFit: this.forceFit,
        data: this.data,
        padding: this.padding,
        animate: this.animate,
      });
      chart.source(this.data);
      chart.scale({
        value: {
          min: 0,
          tickCount: this.tickCount
        }
      });
      chart.tooltip(true);
      chart.coord('polar');
      chart.legend(false);
      chart.axis('label', {
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {lineDash: null},
          hideFirstLine: false,
        }
      });
      chart.axis('value', {
        grid: {
          type: 'polygon',
          lineStyle: {lineDash: null},
        }
      });
      chart.line().position("label*value").color('name', this.colors).size(1);
      chart.point().position("label*value").color('name', this.colors).shape('circle').size(3);

      chart.render();
      this.chart = chart;
    })
  }


  handleLegendClick(item: { checked: boolean; name: string; }, i: string | number) {

  }

  // for custom lengend view
  getLegendData() {
    if (!this.chart) return;
    const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
    if (!geom) return;
    const items = (geom as any).get('dataArray') || []; // 获取图形对应的

    const legendData = items.map((item: { color: any; _origin: any }[]) => {
      // eslint-disable-next-line no-underscore-dangle
      const origins = item.map(t => t._origin);
      const result = {
        name: origins[0].name,
        color: item[0].color,
        checked: true,
        value: origins.reduce((p, n) => p + n.value, 0),
      };
      return result;
    });
    this.legendData = legendData
  };
}
