import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'pro-theme-color',
  templateUrl: 'theme-color.component.html',
  styleUrls: ['theme-color.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proThemeColor',
  preserveWhitespaces: false,
})
export class ThemeColorComponent implements OnInit {

  @Input() colors: any[];
  @Input() title: string;
  @Input() value: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  colorList: any[];

  constructor() {

  }

  ngOnInit() {
    this.colorList = this.colors || [
      {
        key: 'dust',
        color: '#F5222D',
        name: '薄暮'
      },
      {
        key: 'volcano',
        color: '#FA541C',
        name: '火山'
      },
      {
        key: 'sunset',
        color: '#FAAD14',
        name: '日暮'
      },
      {
        key: 'cyan',
        color: '#13C2C2',
        name: '明青'
      },
      {
        key: 'green',
        color: '#52C41A',
        name: '极光绿'
      },
      {
        key: 'daybreak',
        color: '#1890FF',
        name: '拂晓蓝（默认）'
      },
      {
        key: 'geekblue',
        color: '#2F54EB',
        name: '极客蓝'
      },
      {
        key: 'purple',
        color: '#722ED1',
        name: '酱紫'
      },
    ];
  }

  select(key: string) {
    this.value = key;
    this.onChange.emit(this.value);
  }
}
