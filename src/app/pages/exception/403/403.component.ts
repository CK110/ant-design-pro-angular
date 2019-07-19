import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-exception-403',
  template: `
    <pro-result status="403"
                title="403"
                style="background: none"
                [subTitle]="'exception-403.description.403' | translate "
                [extra]="extraTemplate">
    </pro-result>
    <ng-template #extraTemplate>
      <a routerLink="/">
        <button nz-button nzType="primary">
          {{ 'exception-403.exception.back' | translate }}
        </button>
      </a>
    </ng-template>
  `
})
export class Exception403Component implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
