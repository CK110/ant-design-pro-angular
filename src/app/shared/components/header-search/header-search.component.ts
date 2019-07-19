import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'pro-header-search',
  templateUrl: 'header-search.component.html',
  styleUrls: ['header-search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  exportAs: 'proHeaderSearch',
  preserveWhitespaces: false
})
export class HeaderSearchComponent implements OnInit {

  @Input() dataSource: Array<string>;
  @Input() placeholder = 'Search';
  @Output() search: EventEmitter<any> = new EventEmitter();

  @ViewChild('input', {static: true}) inputRef: ElementRef;
  prefixedClassName = 'antd-pro-components-header-search-index';
  searchMode = false;
  inputValue = '';
  options = [];

  constructor() {
  }

  ngOnInit() {
    this.options = this.dataSource;
  }

  onInput(event): void {
    this.inputValue = event.target && event.target.value ;
  }

  onSearch(option) {
    this.searchMode = true;
    this.search.emit(option);
  }

  onKeyDown() {

  }

  enterSearchMode(): void {
    this.searchMode = true;
    if (this.searchMode && this.inputRef) {
      this.inputRef.nativeElement.focus();
    }
  }

  leaveSearchMode(): void {
    this.inputValue = '';
    this.searchMode = false;
  }
}
