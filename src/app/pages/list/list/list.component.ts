import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-query-list',
  templateUrl: 'list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {

  tabList = [
    {
      key: 'articles',
      tab: '文章',
    },
    {
      key: 'projects',
      tab: '项目',
    },
    {
      key: 'applications',
      tab: '应用',
    },
  ];

  tabActiveKey:string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof ActivationEnd)
    ).subscribe(() => this.setActive());
    this.setActive();
  }

  private setActive() {
    this.tabActiveKey = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
  }


  handleFormSubmit() {
    console.log('handleFormSubmit');
  }

  handleTabChange(item:{ key: string; tab: string; }){
    this.router.navigateByUrl(`/list/search/${item.key}`);
  }
}
