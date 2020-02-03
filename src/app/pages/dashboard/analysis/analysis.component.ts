import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {SettingsService} from "@pro-layout";
import {HttpClient} from "@angular/common/http";
import {AnalysisData} from "./data";

@Component({
  selector: 'app-analysis',
  templateUrl: 'analysis.component.html',
  styleUrls: ['analysis.component.less']
})
export class AnalysisComponent implements OnInit {

  analysisData: any = {};

  constructor(private nzMessageService: NzMessageService,
              private settingsService: SettingsService,
              private httpClient: HttpClient) {
  }


  ngOnInit() {
    this.httpClient.get('/api/fake_chart_data').subscribe((result: AnalysisData) => {
      console.log(result);
      this.analysisData = result;
    })
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  get settings() {
    return this.settingsService.settings;
  }
}
