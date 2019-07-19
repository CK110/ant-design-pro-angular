import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-exception-500',
  template: `
    <pro-result status="500"
                title="500"
                style="background: none"
                [subTitle]="'exception-500.description.500' | translate "
                [extra]="extraTemplate">
    </pro-result>
    <ng-template #extraTemplate>
      <a routerLink="/">
        <button nz-button nzType="primary">
          {{ 'exception-500.exception.back' | translate }}
        </button>
      </a>
    </ng-template>
  `
})
export class Exception500Component implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
