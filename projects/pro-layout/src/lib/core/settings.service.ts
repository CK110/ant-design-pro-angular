import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import defaultSettings, {Settings} from "./default-settings";

export const PRO_LAYOUT = new InjectionToken<Settings>('pro-layout');

export const SETTINGS = 'settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _settings: Settings;

  constructor(@Optional() @Inject(PRO_LAYOUT) settings: Settings) {
    this._settings={
      ...defaultSettings,
      ...settings,
      ...this.get(SETTINGS),
    };
    console.log(this._settings);
    this.set(SETTINGS, this._settings);
  }

  private get(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null') || null;
  }

  private set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get settings(): Settings {
    if (!this._settings) {
      this._settings = {
        fixed: true,
        collapsed: false,
        boxed: false,
        lang: null,
        ...this.get(SETTINGS),
      };
      this.set(SETTINGS, this._settings);
    }
    return this._settings;
  }

  setSettings(name: string | Settings, value?: any): boolean {
    if (typeof name === 'string') {
      this.settings[name] = value;
    } else {
      this._settings = name;
    }
    this.set(SETTINGS, this._settings);
    return true;
  }
}
