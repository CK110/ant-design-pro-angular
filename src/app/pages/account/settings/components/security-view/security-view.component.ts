import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-security-view',
  templateUrl: 'security-view.component.html'
})
export class SecurityViewComponent implements OnInit {

  constructor(public msg: NzMessageService) {
  }

  ngOnInit() {
  }
}
