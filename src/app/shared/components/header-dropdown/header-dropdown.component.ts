import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';

export interface HeaderDropdownProps {
  overlayClassName?: string;
  overlay: TemplateRef<void>;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

@Component({
  selector: 'pro-header-dropdown',
  templateUrl: 'header-dropdown.component.html',
  styleUrls: ['header-dropdown.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proHeaderDropdown',
  preserveWhitespaces: false
})
export class HeaderDropdownComponent implements OnInit {

  @Input() overlayClassName: string;
  @Input() overlay: TemplateRef<void>;
  @Input() placement: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter'


  prefixedClassName = 'antd-pro-components-header-dropdown-index';


  constructor() {
  }

  ngOnInit() {
  }
}
