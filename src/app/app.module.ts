import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {SharedModule} from './shared/shared.module';
import {DelonACLModule} from "@delon/acl";
import {DelonAuthModule} from "@delon/auth";
import {TranslateModule} from "@ngx-translate/core";
import {StartupService} from "./core/startup/startup.service";
import {AppRoutingModule} from "./app-routing.module";
import {UserModule} from "./pages/user/user.module";
import {DelonMockModule} from "@delon/mock";
import * as MOCKDATA from '../../_mock';
import {PRO_LAYOUT} from "@pro-layout";
import {RouteReuseStrategy} from "@angular/router";
import {ReuseTabStrategy} from "@pro-layout";
import {ReuseTabService} from "@pro-layout";
import {ALAIN_CONFIG, AlainConfig} from "@delon/util";


export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.init();
}

registerLocaleData(zh);

const alainConfig: AlainConfig = {
  mock: {data: MOCKDATA},
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    SharedModule,
    DelonAuthModule,
    DelonACLModule.forRoot(),
    TranslateModule.forRoot(),
    AppRoutingModule,

    // pages
    UserModule,

    // mock
    DelonMockModule.forRoot()
  ],
  providers: [
    StartupService,
    {provide: APP_INITIALIZER, useFactory: StartupServiceFactory, deps: [StartupService], multi: true,},
    {
      provide: PRO_LAYOUT,
      useValue: {
        title: 'Ant Design Pro',
        logo: 'assets/logo.svg',
        navTheme: 'dark',
        primaryColor: '#1890FF',
        layout: 'sidemenu',
        contentWidth: 'Fluid',
        fixedHeader: true,
        autoHideHeader: false,
        fixSiderbar: true,
        reuseTab: true
      }
    },
    {provide: RouteReuseStrategy, useClass: ReuseTabStrategy, deps: [ReuseTabService]},
    {provide: ALAIN_CONFIG, useValue: alainConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
