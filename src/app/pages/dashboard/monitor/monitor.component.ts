import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: 'monitor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
