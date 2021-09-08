import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {ReuseTabHistoryService} from "../../components/reuse-tab/reuse-tab-history.service";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private renderer: Renderer2,
              private httpClient: HttpClient,
              private reuseTabHistoryService: ReuseTabHistoryService,
              private title: Title) {
  }

  ngOnInit() {
    // 动态设置title
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((event) => {
      this.title.setTitle(event['name'] + ' - ' + 'Ant Design Pro');
      console.log(`==tabStack== ${this.reuseTabHistoryService.toString()}`);
    });

    if (false) {
      this.renderer.addClass(document.body, 'colorWeak');
    }
  }

}
