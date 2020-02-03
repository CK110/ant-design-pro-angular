import {Component, Input, OnInit} from '@angular/core';
import {VisitDataType} from "../../data";

@Component({
  selector: 'app-sales-card',
  templateUrl: 'sales-card.component.html'
})
export class SalesCardComponent implements OnInit {

  rangePickerValue: { title: string; total: number }[] = [];
  isActive: (key: 'today' | 'week' | 'month' | 'year') => string;
  @Input() salesData: VisitDataType[];
  loading: boolean;
  handleRangePickerChange: (dates: any, dateStrings: [string, string]) => void;
  selectDate: (key: 'today' | 'week' | 'month' | 'year') => void;
  rankingListData: { title: string; total: number }[] = [];

  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < 7; i += 1) {
      this.rankingListData.push({
        title: `工专路 ${i} 号店`,
        total: 323234,
      });
    }
  }
}
