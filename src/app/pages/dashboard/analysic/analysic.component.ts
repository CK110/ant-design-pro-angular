import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {SettingsService} from "../../../../../projects/pro-layout/src/lib/core/settings.service";

@Component({
  selector: 'app-analysic',
  templateUrl: 'analysic.component.html',
})
export class AnalysicComponent implements OnInit {


  constructor(private nzMessageService: NzMessageService,
              private settingsService: SettingsService) {}


  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  ngOnInit() {

  }

  get settings() {
    console.log('xxxx');
    return this.settingsService.settings;
  }
}
