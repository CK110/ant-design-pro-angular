import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {BasicLayoutComponent} from './shared/layout/basic-layout/basic-layout.component';
import {UserLayoutComponent} from './shared/layout/user-layout/user-layout.component';
import {LoginComponent} from './pages/user/login/login.component';
import {RegisterComponent} from './pages/user/register/register.component';
import {RegisterResultComponent} from './pages/user/register-result/register-result.component';

const routes: Routes = [
  {
    path: '',
    component: BasicLayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        data: {name: 'Dashboard'},
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'form',
        data: {name: '表单页'},
        loadChildren: () => import('./pages/forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: 'list',
        data: {name: '列表页'},
        loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule)
      },
      {
        path: 'profile',
        data: {name: '详情页'},
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'result',
        data: {name: '结果页'},
        loadChildren: () => import('./pages/result/result.module').then(m => m.ResultModule)
      },
      {
        path: 'exception',
        data: {name: '异常页'},
        loadChildren: () => import('./pages/exception/exception.module').then(m => m.ExceptionModule)
      },
      {
        path: 'account',
        data: {name: '个人页'},
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'other',
        data: {name: '其他页面'},
        loadChildren: () => import('./pages/other/other.module').then(m => m.OtherModule)
      }
    ],
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent, data: {name: '登录', reuse: false}},
      {path: 'register', component: RegisterComponent, data: {name: '注册', reuse: false}},
      {path: 'register-result', component: RegisterResultComponent, data: {name: '注册结果', reuse: false}}
    ]
  },
  {path: '**', redirectTo: 'exception/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
