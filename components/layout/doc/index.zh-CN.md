---
category: Components
cols: 1
type: 布局
title: Table
subtitle: 表格
---

## 何时使用

```ts
import { ProLayoutModule } from 'ng-zorro-pro/layout';
```

## API

> `x` 标识的参数是对应于react版本未实现的属性,`menuData`为Angular版本新增属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[title]` | layout 的 左上角 的 title | `string \| TemplateRef<void>` | `'Ant Design Pro'` |
| `[logo]` | layout 的 左上角 logo 的 url | `string \| TemplateRef<void>` | - |
| `[menuHeaderRender]` | 渲染 logo 和 title | `TemplateRef<void>` | - |
| `(onMenuHeaderClick)` | menu 菜单的头部点击事件 | `EventEmitter<Event>` | - |
| `[layout]` | layout 的菜单模式,sidemenu：右侧导航，topmenu：顶部导航 | `'sidemenu' \| 'topmenu'` | `'sidemenu'` |
| `[contentWidth]` | layout 的内容模式,Fluid：定宽 1200px，Fixed：自适应 | `'Fluid' \| 'Fixed'` | `'Fluid'` |
| `[navTheme]` | 导航的主题 | `'light' \| 'dark'` | `'dark'` |
| `[fixedHeader]` | 是否固定 header 到顶部 | `boolean` | `false` |
| `[fixSiderbar]` | 是否固定导航 | `boolean` | `false` |
| `[autoHideHeader]` | 是否下滑时自动隐藏 header | `boolean` | `false` |
| `[menu]` | x | x | x |
| `[iconfontUrl]` | x | x | x |
| `[locale]` | x | x | x | x |
| `[settings]` | x | x | x | x |
| `[siderWidth]` | 侧边菜单宽度 | `number` | 256 |
| `[collapsed]` | 控制菜单的收起和展开 | `boolean` | false |
| `[onCollapse]` | 菜单的折叠收起事件	 | `EventEmitter<boolean>` | - |
| `[headerRender]` | 自定义头的 render 方法 | `TemplateRef<void>` | - |
| `[rightContentRender]` | 自定义头右部的 render 方法 | `TemplateRef<void>` | - |
| `[collapsedButtonRender]` | 自定义 collapsed button 的方法 | `TemplateRef<boolean>` | - |
| `[footerRender]` | 自定义页脚的 render 方法 | `TemplateRef<void>`| false` | - |
| `[menuData]` | 菜单数据 | `MenuDataItem[]` | - |
| `[menuRender]` | x | x | x |
| `[menuItemRender]` | x | x | x |
| `[menuDataRender]` | x | x | x | x |
| `[breadcrumbRender]` | x | x | x | x |
| `[route]` | x | x | x | x |
| `[disableMobile]` | x | x | x | x |
| `[menuProps]` | x | x | x | x |


### SettingDrawer

> SettingDrawer 提供了一个图形界面来设置 layout 的配置。不建议在正式环境中使用。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| settings | layout 的设置 | [`Settings`](#Settings) | [`Settings`](#Settings) | - |
| onSettingChange | [`Settings`](#Settings) 发生更改事件 | (settings: [`Settings`](#Settings) ) => void | - |

### PageHeaderWrapper

PageHeaderWrapper 封装了 ant design 的 PageHeader 组件，增加了 tabList，和 content。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[content]` | 内容区 | `string \| TemplateRef<void>` | - |
| `[extraContent]` | 额外内容区，位于 content 的右侧 | `string \| TemplateRef<void>` | - |
| `[tabList]` | tab 标题列表 | `{ key: string; tab: string; }[]` | - |
| `[tabActiveKey]` | 当前高亮的 tab 项 | string | - |
| `(onTabChange)` | 切换面板的回调 | `(key) => void` | - |
| `[tabBarExtraContent]` | tab bar 上额外的元素 | TemplateRef<void> | - |

### GridContent

GridContent 封装了 [等宽](https://preview.pro.ant.design/dashboard/analysis?layout=topmenu&contentWidth=Fixed)和 [流式](https://preview.pro.ant.design/dashboard/analysis?layout=topmenu) 的逻辑。你可以在 [preview](https://preview.pro.ant.design/dashboard/analysis) 中查看预览效果。

| 参数         | 说明     | 类型               | 默认值 |
| ------------ | -------- | ------------------ | ------ |
| contentWidth | 内容模式 | 'Fluid' \| 'Fixed' | -      |

## 数据结构

### MenuDataItem

```ts
// 可以通过 import { MenuDataItem } from 'pro-layout'
// 来获取这个类型

export interface MenuDataItem {
  name?: string;
  icon?: string;
  locale?: string;
  path: string;
  guard?: ACLType;
  external?: boolean;
  externalClick?: (menuDataItem: MenuDataItem) => void;
  children?: MenuDataItem[];
  [key: string]: any;
}
```

### 路由配置data

```
{
  name?: string; // 名称
  locale?: string; // 国际化名称
  reuse?: boolean; // 使用路由多标签
  reuseClosable?: boolean; // 是否可以关闭
  reuseRefreshable?: boolean; // 是否可以刷新
  reuseKeepingScroll?: booolean; // 是否可以关闭
}
```
