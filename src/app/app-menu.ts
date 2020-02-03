import {MenuDataItem} from "@pro-layout";

export const menuData: MenuDataItem[] = [
  {
    name: 'Dashboard', icon: 'dashboard', locale: 'menu.dashboard', path: '/dashboard',
    children: [
      {name: '分析页', locale: 'menu.dashboard.analysis', path: '/dashboard/analysis',},
      {name: '监控页', locale: 'menu.dashboard.monitor', path: '/dashboard/monitor'},
      {name: '工作台', locale: 'menu.dashboard.workplace', path: '/dashboard/workplace'}
    ]
  },
  {
    name: '表单页', icon: 'form', locale: 'menu.form', path: '/form',
    children: [
      {name: '基础表单', locale: 'menu.form.basic-form', path: '/form/basic-form'},
      {name: '分步表单', locale: 'menu.form.step-form', path: '/form/step-form'},
      {name: '高级表单', locale: 'menu.form.advanced-form', path: '/form/advanced-form'}
    ]
  },
  {
    name: '列表页', icon: 'table', locale: 'menu.list', path: '/list',
    children: [
      {name: '查询表格', locale: 'menu.list.table-list', path: '/list/table-list'},
      {name: '标准列表', locale: 'menu.list.basic-list', path: '/list/basic-list'},
      {name: '卡片列表', locale: 'menu.list.card-list', path: '/list/card-list'},
      {
        name: '搜索列表', locale: 'menu.list.search-list', path: '/list/search',
        children: [
          {name: '搜索列表（文章）', locale: 'menu.list.search-list.articles', path: '/list/search/articles'},
          {name: '搜索列表（项目）', locale: 'menu.list.search-list.articles', path: '/list/search/projects'},
          {name: '搜索列表（应用）', locale: 'menu.list.search-list.articles', path: '/list/search/applications'}
        ]
      }
    ]
  },
  {
    name: '详情页', icon: 'profile', locale: 'menu.profile', path: '/profile',
    children: [
      {name: '基础详情页', locale: 'menu.profile.basic', path: '/profile/basic'},
      {name: '高级详情页', locale: 'menu.profile.advanced', path: '/profile/advanced',}
    ]
  },
  {
    name: '结果页', icon: 'check-circle-o', locale: 'menu.result', path: '/result',
    children: [
      {name: '成功页', locale: 'menu.result.success', path: '/result/success'},
      {name: '失败页', locale: 'menu.result.fail', path: '/result/fail'}
    ]
  },
  {
    name: '异常页', icon: 'warning', locale: 'menu.exception', path: '/exception',
    children: [
      {name: '403', locale: 'menu.exception.not-permission', path: '/exception/403'},
      {name: '404', locale: 'menu.exception.not-find', path: '/exception/404'},
      {name: '500', locale: 'menu.exception.server-error', path: '/exception/500'}
    ]
  },
  {
    name: '个人页', icon: 'user', locale: 'menu.account', path: '/account', guard: {ability: [1, 2]},
    children: [
      {name: '个人中心', locale: 'menu.account.center', path: '/account/center'},
      {
        name: '个人设置', locale: 'menu.account.settings', path: '/account/settings',
        // children: [
        //   {name: '基本设置', path: '/account/center/base'},
        //   {name: '安全设置', path: '/account/center/security'},
        //   {name: '个性化设置', path: '/account/center/custom'},
        //   {name: '账户绑定', path: '/account/center/binding'},
        //   {name: '新消息通知', path: '/account/center/notification'}
        // ]
      },
    ]
  },
  {
    name: '其他页面', icon: 'slack', path: '/other',
    children: [
      {name: '用户列表', path: '/other/user-list'},
      {name: '角色列表', path: '/other/role-list'},
      {name: '权限列表', path: '/other/permission-list'}
    ]
  },
];
