# ant design pro layout of angular

## 使用

```bash
npm i pro-layout --save
// or
yarn add pro-layout
```

```html
<pro-basic-layout [logo]="settings.logo"
                  [title]="settings.title"
                  [navTheme]="settings.navTheme"
                  [fixSiderbar]="settings.fixSiderbar"
                  [fixedHeader]="settings.fixedHeader"
                  [autoHideHeader]="settings.autoHideHeader"
                  [layout]="settings.layout"
                  [menuData]="menuData"
                  [reuseTab]="settings.reuseTab"
                  [rightContentRender]="rightContentRender"
                  [links]="footer.links"
                  [copyright]="copyRightTemplate">
  <router-outlet></router-outlet>
</pro-basic-layout>

```

### PRO_LAYOUT (InjectToken)

```
  {
    provide: PRO_LAYOUT,
    useValue: {
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
    }
  }
```

### MenuDataItem

```ts
export interface MenuDataItem {
  name?: string;
  icon?: string;
  locale?: string;
  path: string;
  guard?: ACLType;
  external?: boolean;
  children?: MenuDataItem[];
  [key: string]: any;
}
```

### Router config data 

```ts
export interface RouterData {
  name?: string;
  locale?: string;
  guard?: ACLType;
  reuse?: boolean
  [key: string]: any;
}
```
