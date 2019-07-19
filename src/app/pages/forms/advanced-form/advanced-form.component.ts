import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-advanced-form',
  templateUrl: 'advanced-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
