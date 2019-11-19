import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface NoticeIconData {
  avatar?: string; //头像图片链接
  title?: string;//标题
  description?: string;//描述信息
  datetime?: string;//时间戳
  extra?: string; //额外信息，在列表项右上角
  style?: any;
  key?: string | number;
  read?: boolean; //是否已读状态
}

@Component({
  selector: 'pro-notice-list',
  templateUrl: 'notice-list.component.html',
  styleUrls: ['notice-list.component.less']
})
export class NoticeListComponent implements OnInit {

  @Input() data: NoticeIconData[] = [];
  @Output() readonly onClick = new EventEmitter<any>();
  @Output() readonly onClear = new EventEmitter<any>();
  @Input() title: string;
  @Output() readonly onViewMore = new EventEmitter<any>();
  @Input() emptyText: string;
  @Input() showClear = true;
  @Input() clearText: string;
  @Input() viewMoreText: string;
  @Input() showViewMore = false;

  constructor() {
  }

  ngOnInit() {
  }

  handleClick(item) {
    this.onClick.emit(item);
  }


  clearNotice(event: Event) {
    this.onClear.emit(event);
  }

  viewMore(event: Event) {
    this.onViewMore.emit(event);
  }
}
