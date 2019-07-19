import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SettingsService} from "../../../../../projects/pro-layout/src/lib/core/settings.service";

@Component({
  selector: 'app-basic-profile',
  templateUrl: 'basic-profile.component.html',
  styleUrls: ['basic-profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
