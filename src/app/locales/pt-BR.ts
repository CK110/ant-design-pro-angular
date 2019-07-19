import globalHeader from './pt-BR/globalHeader';
import menu from './pt-BR/menu';
import settingDrawer from './pt-BR/settingDrawer';
import settings from './pt-BR/settings';
import pwa from './pt-BR/pwa';
import component from './pt-BR/component';

import pageExceptiont403 from '../pages/exception/403/locales/pt-BR';
import pageExceptiont404 from '../pages/exception/404/locales/pt-BR';
import pageExceptiont500 from '../pages/exception/500/locales/pt-BR';


export default {
  'navBar.lang': 'Idiomas',
  'layout.user.link.help': 'ajuda',
  'layout.user.link.privacy': 'política de privacidade',
  'layout.user.link.terms': 'termos de serviços',
  'app.preview.down.block': 'Download this page to your local project',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,


  ...pageExceptiont403,
  ...pageExceptiont404,
  ...pageExceptiont500,
};
