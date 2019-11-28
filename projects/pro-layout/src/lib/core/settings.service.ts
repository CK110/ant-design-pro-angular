import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import defaultSettings, {Settings} from './default-settings';

/**
 * custom layout setting
 */
export const PRO_LAYOUT = new InjectionToken<Settings>('pro-layout');

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private setting: Settings;

  constructor(@Optional() @Inject(PRO_LAYOUT) customSettings: Settings) {
    this.setting = {
      ...defaultSettings,
      ...customSettings,
    };
  }

  get settings(): Settings {
    return this.setting;
  }

  setSettings(name: string | Settings, value?: any): boolean {
    if (typeof name === 'string') {
      this.setting[name] = value;
    } else {
      this.setting = name;
    }
    return true;
  }
}
