import {Injectable} from '@angular/core';
import {ACLService} from "@delon/acl";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {default as pro_zh_CN} from '../../locales/zh-CN';


@Injectable()
export class StartupService {

  constructor(private httpClient: HttpClient,
              private aclService: ACLService,
              private translateService: TranslateService) {
  }

  init(): Promise<any> {
    return new Promise(resolve => {
      // this.httpClient.get().subscribe(
      //   ()=>{
      //   this.translateService.setTranslation('en_US',en_US_PRO);
      //   this.translateService.setDefaultLang('en_US')
      // },
      //   ()=>{},
      //   ()=>{resolve(null);})

      this.translateService.setTranslation('zh-CN', pro_zh_CN);
      this.translateService.setDefaultLang('zh-CN');
      this.aclService.setAbility([1, 2])
      resolve(null)
    });
  }
}
