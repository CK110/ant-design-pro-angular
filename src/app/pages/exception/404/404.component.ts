import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-exception-404',
  template: `
    <pro-result status="404"
                title="404"
                style="background: none"
                [subTitle]="'exception-404.description.404' | translate "
                [extra]="extraTemplate">
    </pro-result>
    <ng-template #extraTemplate>
      <a routerLink="/">
        <button nz-button nzType="primary">
          {{ 'exception-404.exception.back' | translate }}
        </button>
      </a>
    </ng-template>
  `
})
export class Exception404Component implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
