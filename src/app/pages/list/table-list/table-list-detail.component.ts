import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableListData, TableListItem, TableListPagination} from "./data";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-table-list',
  template: `
      name:{{name}}
      <input nz-input>
      <br>
      <h4>1. nzTab</h4>
<!--      <nz-tabset>-->
<!--          <nz-tab nzTitle="Tab 1">-->
<!--              Content of Tab Pane 1-->
<!--          </nz-tab>-->
<!--          <pro-tab nzTitle="Tab 2">-->
<!--              Content of Tab Pane 2-->
<!--          </pro-tab>-->
<!--          <pro-tab nzTitle="Tab 3">-->
<!--              Content of Tab Pane 3-->
<!--          </pro-tab>-->
<!--      </nz-tabset>-->
      
<!--      <h4>1. 基本</h4>-->
<!--      <pro-tabset>-->
<!--          <pro-tab nzTitle="Tab 1">-->
<!--              Content of Tab Pane 1-->
<!--          </pro-tab>-->
<!--          <pro-tab nzTitle="Tab 2">-->
<!--              Content of Tab Pane 2-->
<!--          </pro-tab>-->
<!--          <pro-tab nzTitle="Tab 3">-->
<!--              Content of Tab Pane 3-->
<!--          </pro-tab>-->
<!--      </pro-tabset>-->
<!--      <br>-->
<!--      <h4>2. 禁用</h4>-->
<!--      <nz-tabset>-->
<!--          <nz-tab *ngFor="let tab of tabs2" [nzTitle]="tab.name" [nzDisabled]="tab.disabled">-->
<!--              {{ tab.name }}-->
<!--          </nz-tab>-->
<!--      </nz-tabset>-->
<!--      <br>-->
  `,
})
export class TableListDetailComponent implements OnInit {

  name: string;

  tabs2 = [
    {
      name: 'Tab 1',
      disabled: false
    },
    {
      name: 'Tab 2',
      disabled: true
    },
    {
      name: 'Tab 3',
      disabled: false
    }
  ];

  constructor(public router: Router,
              private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.name = queryParams.name;
    });
  }

  ngOnInit(): void {
  }

}
