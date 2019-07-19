import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-step-form',
  templateUrl: 'step-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
