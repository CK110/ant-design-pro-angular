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
import {RouteReuseStrategy} from "@angular/router";
import {ReuseTabStrategy} from "pro-lib-test/reuse-tab";
import {ReuseTabService} from "pro-lib-test/reuse-tab";
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
    {provide: RouteReuseStrategy, useClass: ReuseTabStrategy, deps: [ReuseTabService]},
    {provide: ALAIN_CONFIG, useValue: alainConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
