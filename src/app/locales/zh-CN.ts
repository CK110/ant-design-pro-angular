import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import pwa from './zh-CN/pwa';
import component from './zh-CN/component';
import pageLogin from '../pages/user/login/locales/zh-CN';
import pageRegister from '../pages/user/register/locales/zh-CN';
import pageRegisterResult from '../pages/user/register-result/locales/zh-CN';

import pageExceptiont403 from '../pages/exception/403/locales/zh-CN';
import pageExceptiont404 from '../pages/exception/404/locales/zh-CN';
import pageExceptiont500 from '../pages/exception/500/locales/zh-CN';


export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.preview.down.block': '下载此页面到本地项目',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,

  ...pageLogin,
  ...pageRegister,
  ...pageRegisterResult,
  ...pageExceptiont403,
  ...pageExceptiont404,
  ...pageExceptiont500,
};
