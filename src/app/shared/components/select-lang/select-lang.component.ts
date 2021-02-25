import {Component, Input, OnInit} from '@angular/core';
import ngZh from '@angular/common/locales/zh';
import ngZhTw from '@angular/common/locales/zh-Hant';
import ngEn from '@angular/common/locales/en';
import ngPt from '@angular/common/locales/pt';

import {en_US, NzI18nService, pt_BR, zh_CN, zh_TW} from "ng-zorro-antd/i18n";
import zhCN from 'date-fns/locale/zh-CN';
import zhTW from 'date-fns/locale/zh-TW';
import enUS from 'date-fns/locale/en-US/index';
import ptBR from 'date-fns/locale/pt-BR';


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
    dateFns: zhCN,
    pro: pro_zh_CN,
    icon: '🇨🇳',
  },
  'zh-TW': {
    label: '繁体中文',
    ng: ngZhTw,
    zorro: zh_TW,
    dateFns: zhTW,
    pro: pro_zh_TW,
    icon: '🇭🇰',
  },
  'en-US': {
    label: 'English',
    ng: ngEn,
    zorro: en_US,
    dateFns: enUS,
    pro: pro_en_US,
    icon: '🇬🇧',
  },
  'pt-BR': {
    label: 'Português',
    ng: ngPt,
    zorro: pt_BR,
    dateFns: ptBR,
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
