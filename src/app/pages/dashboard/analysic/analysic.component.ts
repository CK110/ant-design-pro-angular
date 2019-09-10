import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {SettingsService} from "@pro-layout";

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
