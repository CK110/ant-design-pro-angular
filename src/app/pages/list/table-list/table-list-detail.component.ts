import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReuseComponentInstance, ReuseHookOnReuseInitType, ReuseTabService} from "@pro-layout";

@Component({
  selector: 'app-table-list',
  template: `
      name:{{name}}
      <input nz-input>
      <br>
      <button nz-button (click)="get('items')">getItems</button>
      <button nz-button (click)="get('count')">getCount</button>
      <button nz-button (click)="get('title')">setTitle</button>
      <button nz-button (click)="get('index')">getIndex</button>

      <button nz-button (click)="get('close')">close</button>


      <button nz-button (click)="refresh()">刷新</button>
      <button nz-button (click)="result()">结果页</button>
      <button nz-button (click)="refreshPage()">触发列表页刷新hook</button>
      <button nz-button (click)="closeToList()">closeToList</button>

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
    console.log('type');
    if (type === 'init') {
      console.log('init');
    }
    if (type === 'refresh') {
      console.log('refresh');
    }
  }

  get(type) {
    if (type === 'items') {
      console.log(this.reuseTabService.items);
    }
    if (type === 'count') {
      console.log(this.reuseTabService.count);
    }
    if (type === 'title') {
      this.reuseTabService.title = '新名称';
    }
    if (type === 'index') {
      console.log(this.reuseTabService.index('/list/table-list', {}))
    }
    if (type === 'close') {
      this.reuseTabService.close('/list/table-list',{});
    }

  }

  refresh() {
    this.reuseTabService.refresh();
  }

  onReuseDestroy() {
    console.log('onReuseDestroy');
  }

  destroy: () => void;

  result() {
    this.reuseTabService.replace('/result/success', {});
    // this.router.navigateByUrl('/result/success');
  }

  refreshPage() {
    this.router.navigate(['/list/table-list']).then(() => {
      this.reuseTabService.refreshPage('/list/table-list', {});
    });
  }

  closeToList() {
    this.reuseTabService.closeCurAndToList('/list/table-list', {})
  }
}
