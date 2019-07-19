import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import pwa from './en-US/pwa';
import component from './en-US/component';
import pageLogin from '../pages/user/login/locales/en-US';
import pageRegister from '../pages/user/register/locales/en-US';
import pageRegisterResult from '../pages/user/register-result/locales/en-US';
import pageExceptiont403 from '../pages/exception/403/locales/en-US';
import pageExceptiont404 from '../pages/exception/404/locales/en-US';
import pageExceptiont500 from '../pages/exception/500/locales/en-US';


export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
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
  ...pageExceptiont500
};
