import {Component, OnInit} from '@angular/core';
import {SettingsService} from "@pro-layout";

@Component({
  selector: 'app-basic-profile',
  templateUrl: 'basic-profile.component.html',
  styleUrls: ['basic-profile.component.less'],

})
export class BasicProfileComponent implements OnInit {
  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
  }

  get settings() {
    return this.settingsService.settings;
  }
}
