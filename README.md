[![NPM version](https://img.shields.io/npm/v/pro-layout.svg)](https://www.npmjs.com/package/pro-layout)


<h1 align="center">Ant Design Pro Angular</h1>

<div align="center">

![image](https://user-images.githubusercontent.com/8186664/55930941-276e6580-5c56-11e9-800d-bc284bda4daf.png)

开箱即用的中台前端/设计解决方案。此仓库是 Angular 版本的 Ant Design Pro 的 layout, 是为了方便快速的使用 layout 而开发。

样式对应 `@ant-design/pro-layout:4.6.2` 
test

</div>

## 使用

```bash
npm i pro-layout --save
// or
yarn add pro-layout
```

```ts
import {LayoutModule} from "pro-layout";

@NgModule({
  imports: [ LayoutModule ]
})
export class AppModule {
}
```

## 依赖项目

- [ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd)
- [@delon/auth](https://ng-alain.com/auth/getting-started/zh)
- [@delon/acl](https://ng-alain.com/acl/getting-started/zh)
- [@delon/mock](https://ng-alain.com/mock/getting-started/zh)
- [@ngx-translate/core](https://github.com/ngx-translate/core)
