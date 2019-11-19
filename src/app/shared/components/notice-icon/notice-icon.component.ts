import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoticeIconData} from "@shared/components/notice-icon/notice-list/notice-list.component";

export interface NoticeItem {
  title: string;
  list: NoticeIconData[];
  emptyText: string; //空列表文本，默认：`无通知`
  emptyImage: string; //空列表图像
  clearText: string; //清空文本，默认：`清空`,
  viewMoreText: string;
}

@Component({
  selector: 'pro-notice-icon',
  templateUrl: 'notice-icon.component.html',
  styleUrls: ['notice-icon.component.less']
})
export class NoticeIconComponent {

  @Input() data: NoticeItem[] = [];

  @Input() count: number = 2;
  @Input() bell: any;
  @Input() className: string;
  @Input() loading: boolean;
  @Output() readonly onClear = new EventEmitter<any>();
  @Output() readonly onItemClick = new EventEmitter<NoticeIconData>();
  @Output() readonly onViewMore = new EventEmitter<any>();
  @Output() readonly onTabChange = new EventEmitter<string>();
  @Input() style: string;
  @Output() readonly onPopupVisibleChange = new EventEmitter<boolean>();
  @Input() popupVisible: boolean;
  @Input() clearText: string;
  @Input() viewMoreText: string;
  @Input() clearClose: boolean;

  constructor() {
  }

  handleVisibleChange(result: boolean) {
    this.popupVisible = !this.popupVisible;
    this.onPopupVisibleChange.emit(result);
  }

  onClick(item: NoticeIconData) {

  }

  clearNotice(event: Event) {
  }

  viewMore(event: Event) {
  }
}
