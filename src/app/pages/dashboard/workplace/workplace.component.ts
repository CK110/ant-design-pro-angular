import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-workplace',
  templateUrl: 'workplace.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkplaceComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
