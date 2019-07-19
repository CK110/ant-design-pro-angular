import globalHeader from './zh-TW/globalHeader';
import menu from './zh-TW/menu';
import settingDrawer from './zh-TW/settingDrawer';
import settings from './zh-TW/settings';
import pwa from './zh-TW/pwa';
import component from './zh-TW/component';
import pageLogin from '../pages/user/login/locales/zh-TW';
import pageRegister from '../pages/user/register/locales/zh-TW';
import pageRegisterResult from '../pages/user/register-result/locales/zh-TW';
import pageExceptiont403 from '../pages/exception/403/locales/zh-TW';
import pageExceptiont404 from '../pages/exception/404/locales/zh-TW';
import pageExceptiont500 from '../pages/exception/500/locales/zh-TW';


export default {
  'navBar.lang': '語言',
  'layout.user.link.help': '幫助',
  'layout.user.link.privacy': '隱私',
  'layout.user.link.terms': '條款',
  'app.preview.down.block': '下載此頁面到本地項目',
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
