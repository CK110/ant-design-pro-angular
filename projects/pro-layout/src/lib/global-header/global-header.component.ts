import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'pro-global-header',
  templateUrl: 'global-header.component.html',
  styleUrls: ['global-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proGlobalHeader',
  preserveWhitespaces: false
})
export class GlobalHeaderComponent implements OnInit {

  @Input() isMobile: boolean;

  @Input() logo: TemplateRef<void> | string;

  @Input() collapsed: boolean;

  @Input() rightContentRender: TemplateRef<void>;

  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  toggle() {
    this.collapsedChange.emit(!this.collapsed);
  }
}
