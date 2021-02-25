import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-register-result',
  templateUrl: 'register-result.component.html',
  styleUrls: ['register-result.component.less']
})
export class RegisterResultComponent implements OnInit {

  prefixedClassName = 'antd-pro-pages-user-register-result';
  params = { email: '' };
  email = '';
  constructor(route: ActivatedRoute, public messageService: NzMessageService) {
    this.params.email = this.email = route.snapshot.queryParams.email || 'AntDesign@example.com';
  }

  ngOnInit(): void {
  }
}
