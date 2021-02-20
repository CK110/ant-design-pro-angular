import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import {HttpClient} from "@angular/common/http";
import {ActivitiesType, AnalysisData, CurrentUser, NoticeType} from "./data.d";

export const Links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

@Component({
  selector: 'app-workplace',
  templateUrl: 'workplace.component.html',
  styleUrls: ['workplace.component.less'],
  preserveWhitespaces: false
})
export class WorkplaceComponent implements OnInit {

  currentUser: CurrentUser;

  projectLoading: boolean = true;
  projectNotice: any[] = [];

  activitiesLoading: boolean = true;
  activities: any[] = [];

  radarData: any[];
  links = Links;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get('/api/project/notice').subscribe((result: NoticeType[]) => {
      this.projectLoading = false;
      this.projectNotice = result;
    });
    this.httpClient.get('/api/activities').subscribe((result: ActivitiesType[]) => {
      this.activitiesLoading = false;
      this.activities = result;
    });
    this.httpClient.get('/api/fake_chart_data').subscribe((result: AnalysisData) => {
      this.radarData = result.radarData;
    });
    this.httpClient.get('/api/currentUser').subscribe((result: CurrentUser) => {
      this.currentUser = result;
    });
  }

  fromNow(time: any) {
    return formatDistanceToNow(time);
  }

  renderTemplate(item: ActivitiesType) {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
      if (item[key]) {
        return `
          <a href=${item[key].link} key=${item[key].name}>
            ${item[key].name}
          </a>`
      }
      return key;
    });
    return events.join('');
  }
}
