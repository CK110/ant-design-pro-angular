import {Component, Input, OnInit} from '@angular/core';
import ngZh from '@angular/common/locales/zh';
import ngZhTw from '@angular/common/locales/zh-Hant';
import ngEn from '@angular/common/locales/en';
import ngPt from '@angular/common/locales/pt';

import {zh_CN, zh_TW, en_US, pt_BR, NzI18nService} from 'ng-zorro-antd';
import * as df_zh_cn from 'date-fns/locale/zh-CN';
import * as df_zh_tw from 'date-fns/locale/zh-TW';
import * as df_en from 'date-fns/locale/en-US/index';
import * as df_pt from 'date-fns/locale/pt';

import {default as pro_zh_CN} from '../../../locales/zh-CN';
import {default as pro_zh_TW} from '../../../locales/zh-TW';
import {default as pro_en_US} from '../../../locales/en-US';
import {default as pro_pt_BR} from '../../../locales/pt-BR';
import {ProI18nService} from "../../../core/i18n/i18n.service";
import {TranslateService} from "@ngx-translate/core";
import {registerLocaleData} from "@angular/common";


interface LangData {
  label: string;
  ng: any;
  zorro: any;
  dateFns: any;
  pro: any;
  icon: string;
}

const LANGS: { [key: string]: LangData } = {
  'zh-CN': {
    label: '简体中文',
    ng: ngZh,
    zorro: zh_CN,
    dateFns: df_zh_cn,
    pro: pro_zh_CN,
    icon: '🇨🇳',
  },
  'zh-TW': {
    label: '繁体中文',
    ng: ngZhTw,
    zorro: zh_TW,
    dateFns: df_zh_tw,
    pro: pro_zh_TW,
    icon: '🇭🇰',
  },
  'en-US': {
    label: 'English',
    ng: ngEn,
    zorro: en_US,
    dateFns: df_en,
    pro: pro_en_US,
    icon: '🇬🇧',
  },
  'pt-BR': {
    label: 'Português',
    ng: ngPt,
    zorro: pt_BR,
    dateFns: df_pt,
    pro: pro_pt_BR,
    icon: '🇧🇷',
  },
};

@Component({
  selector: 'pro-select-lang,[pro-select-lang]',
  templateUrl: 'select-lang.component.html',
  styleUrls: ['select-lang.component.less']
})
export class SelectLangComponent implements OnInit {

  locales = Object.keys(LANGS);
  languages = LANGS;
  currentLocale: string;

  constructor(private i18nService: NzI18nService,
              private  i18n: ProI18nService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.currentLocale = this.translateService.getDefaultLang();
  }

  changeLang(locale) {
    const language = this.languages[locale];

    registerLocaleData(language.ng);
    this.i18nService.setLocale(language.zorro);
    this.i18nService.setDateLocale(language.dateFns);

    this.translateService.setTranslation(locale, language.pro);
    this.translateService.setDefaultLang(locale);
  }
}
