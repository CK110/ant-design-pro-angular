import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MenuTheme} from '@pro-layout';

@Component({
  selector: 'pro-right-content',
  templateUrl: 'right-content.component.html',
  styleUrls: ['right-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightContentComponent {

  @Input() theme: MenuTheme;
  @Input() layout: string;

  constructor() {
  }
}
