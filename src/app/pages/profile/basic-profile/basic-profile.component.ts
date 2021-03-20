import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-basic-profile',
  templateUrl: 'basic-profile.component.html',
  styleUrls: ['basic-profile.component.less'],

})
export class BasicProfileComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  get settings() {
    return null;
    // return this.settingsService.settings;
  }
}
