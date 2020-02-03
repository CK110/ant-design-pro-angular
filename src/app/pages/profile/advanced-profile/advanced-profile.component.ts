import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-advanced-profile',
  templateUrl: 'advanced-profile.component.html',
  styleUrls: ['advanced-profile.component.less'],

})
export class AdvancedProfileComponent implements OnInit {

  tabList=[{key: 'detail',tab: '详情',},{key: 'rule',tab: '规则',}];

  data = {
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  };

  operationKey:string;

  constructor(public messageService: NzMessageService,
              private httpClient: HttpClient,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.httpClient.get('/api/profile/advanced').subscribe((res: any) => {
      this.data = res;
      // this.change({ index: 0, tab: null! });
      // this.cdr.detectChanges();
    });
  }
}
