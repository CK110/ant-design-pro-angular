import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';

export interface GlobalFooterProps {
  links?: {
    key?: string;
    title: TemplateRef<void> | string;
    href: string;
    blankTarget?: boolean;
  }[];
  copyright?: TemplateRef<void>;
  style?: string;
  className?: string;
}

@Component({
  selector: 'pro-global-footer,[pro-global-footer]',
  templateUrl: 'global-footer.component.html',
  styleUrls: ['global-footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proGlobalFooter',
  preserveWhitespaces: false,
  host: {
    '[class]': `'ant-pro-global-footer ' + className`
  }
})
export class GlobalFooterComponent implements OnInit {

  @Input() className = '';
  @Input() links: GlobalFooterProps['links'];
  @Input() copyright: TemplateRef<void> | string;

  constructor() {
  }

  ngOnInit() {
  }

  isString(val) {
    return typeof val === 'string';
  }
}
