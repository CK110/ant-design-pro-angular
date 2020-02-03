import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-active-chart',
  templateUrl: 'active-chart.component.html',
  styleUrls: ['active-chart.component.less']
})
export class ActiveChartComponent implements OnInit {

  activeData: any;

  constructor() {
  }

  ngOnInit() {
    this.activeData = this.getActiveData();
    console.log(this.activeData);
  }

  getActiveData() {
    const activeData = [];
    for (let i = 0; i < 24; i += 1) {
      activeData.push({
        x: `${this.fixedZero(i)}:00`,
        y: Math.floor(Math.random() * 200) + i * 50,
      });
    }
    return activeData;
  }

  fixedZero(val: number) {
    return val * 1 < 10 ? `0${val}` : val;
  }
}
