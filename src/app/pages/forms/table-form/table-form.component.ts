import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-form',
  templateUrl: 'table-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
