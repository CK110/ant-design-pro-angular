import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-basic-list',
  templateUrl: 'basic-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicListComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
