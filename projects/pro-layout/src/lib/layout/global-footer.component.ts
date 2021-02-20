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
  template: `
      <div class="ant-pro-global-footer-links">
          <ng-container *ngIf="links && links.length > 0">
              <a *ngFor="let link of links"
                 [title]="link.key"
                 [target]="link.blankTarget? '_blank' : '_self'"
                 [href]="link.href">
                  <ng-container *ngIf="isString(link.title);else titleTemplate ">
                      {{link.title}}
                  </ng-container>
                  <ng-template #titleTemplate>
                      <ng-container [ngTemplateOutlet]="link.title"></ng-container>
                  </ng-template>
              </a>
          </ng-container>
      </div>
      <div *ngIf="copyright" class="ant-pro-global-footer-copyright">
          <ng-container *ngIf="isString(copyright);else copyrightTemplate ">
              {{copyright}}
          </ng-container>
          <ng-template #copyrightTemplate>
              <ng-container [ngTemplateOutlet]="copyright"></ng-container>
          </ng-template>
      </div>
  `,
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
