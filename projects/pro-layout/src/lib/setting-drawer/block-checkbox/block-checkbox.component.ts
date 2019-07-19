import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'pro-block-checkbox',
  templateUrl: 'block-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proBlockCheckbox',
  preserveWhitespaces: false,
  host: {
    '[class]': `baseClassName`,
  }
})
export class BlockCheckboxComponent implements OnInit {

  @Input() value: string;
  @Input() list: {
    title: string;
    key: string;
    url: string;
  }[] = [];
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  baseClassName = 'ant-pro-setting-drawer-block-checbox';

  constructor() {
  }

  ngOnInit() {
  }

  select(key: string) {
    this.value = key;
    this.onChange.emit(this.value);
  }
}
