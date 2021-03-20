import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'pro-right-content',
  templateUrl: 'right-content.component.html',
  styleUrls: ['right-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightContentComponent {

  @Input() theme: any;
  @Input() layout: string;

  constructor() {
  }
}
