import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableListData, TableListItem, TableListPagination} from "./data";
import {ActivatedRoute, Router} from "@angular/router";
import {ReuseComponentInstance, ReuseHookOnReuseInitType, ReuseTabService} from "@pro-layout";

@Component({
  selector: 'app-table-list',
  template: `
      name:{{name}}
      <input nz-input>
      <br>
      <button nz-button (click)="refresh()">刷新</button>
  `,
})
export class TableListDetailComponent implements OnInit, ReuseComponentInstance {


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
              public reuseTabService: ReuseTabService,
              private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.name = queryParams.name;
    });
    // console.log("curUrl:" + this.reuseTabService.curUrl);
    // console.log("curQueryParams:" + this.reuseTabService.curQueryParams);
    // console.log("curUrlWithQueryParams:" + this.reuseTabService.curUrlWithQueryParams);
    // console.log(this.reuseTabService.items);
    // this.reuseTabService.title = '新名称';
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  onReuseInit(type: ReuseHookOnReuseInitType) {
    console.log('onReuseInit');
    if (type === 'init') {
      console.log('init');

    }
    if (type === 'refresh') {
      console.log('refresh');
    }
  }

  refresh() {
    this.reuseTabService.refresh();
  }

  onReuseDestroy(){
    console.log('onReuseDestroy');
  }

  destroy: () => void;

}
