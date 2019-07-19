import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-basic-form',
  templateUrl: 'basic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
