import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'pro-global-header,[pro-global-header]',
  template: `
      <ng-container *ngIf="isMobile">
          <a class="ant-pro-global-header-logo" key="logo">
              <ng-container *nzStringTemplateOutlet="logo">
                  <img [src]="logo" alt="logo"/>
              </ng-container>
          </a>
      </ng-container>
      <!-- collapsedButton -->
      <ng-container [ngTemplateOutlet]="collapsedButtonRender? collapsedButtonRender: defaultCollapsedButtonTemplate"
                    [ngTemplateOutletContext]="collapsed"></ng-container>

      <ng-template #defaultCollapsedButtonTemplate>
      <span class="ant-pro-global-header-trigger" (click)="toggle()">
        <i nz-icon [nzType]="collapsed ? 'menu-unfold' : 'menu-fold'"></i>
        </span>
      </ng-template>
      <!--rightContentRender-->
      <ng-container [ngTemplateOutlet]="rightContentRender"
                    [ngTemplateOutletContext]="{ $implicit: {theme: 'light',layout: 'sidemenu'} }">
      </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proGlobalHeader',
  preserveWhitespaces: false,
  host: {
    '[class]': `'ant-pro-global-header'`
  }
})
export class GlobalHeaderComponent implements OnInit {

  @Input() isMobile: boolean;
  @Input() logo: TemplateRef<void> | string;
  @Input() collapsed: boolean;
  @Input() collapsedButtonRender: TemplateRef<boolean>;
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
