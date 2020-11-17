export type ContentWidth = 'Fluid' | 'Fixed';
export type MenuTheme = 'light' | 'dark';

export interface Settings {
  /**
   * theme for nav menu
   */
  navTheme: MenuTheme | undefined;
  /**
   * nav menu position: `sidemenu` or `topmenu`
   */
  layout: 'sidemenu' | 'topmenu';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
   */
  contentWidth: ContentWidth;
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * auto hide header
   */
  autoHideHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;

  title: string;

  logo: string;

  reuseTab: boolean;

  [key: string]: any;
}

const defaultSettings: Settings = {
  language: 'zh-CN',
  title: 'Ant Design Pro',
  logo: 'assets/logo.svg',
  navTheme: 'dark',
  primaryColor: '#1890FF',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  reuseTab: true,
};
export default defaultSettings;
