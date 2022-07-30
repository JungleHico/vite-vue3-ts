import { MockMethod } from 'vite-plugin-mock';
import { MenuItem } from '../types/permission';
import { successResult, resultError, getRequestToken } from './utils';

const getMenu = () => {
  const menuList: MenuItem[] = [
    {
      path: '/form',
      name: 'Form',
      meta: { title: '表单页', icon: 'FormOutlined', keepAlive: true },
      component: 'views/form/index.vue',
      redirect: '/form/basicForm',
      children: [
        {
          path: '/form/basicForm',
          name: 'BasicForm',
          meta: { title: '基础表单', keepAlive: true },
          component: 'views/form/basicForm/index.vue',
        },
        {
          path: '/form/stepForm',
          name: 'StepForm',
          meta: { title: '分步表单', keepAlive: true },
          component: 'views/form/stepForm/index.vue',
        },
      ],
    },
    {
      path: '/list',
      name: 'List',
      meta: { title: '列表页', icon: 'TableOutlined', keepAlive: true },
      component: 'views/list/index.vue',
      redirect: '/list/tableList',
      children: [
        {
          path: '/list/tableList',
          name: 'TableList',
          meta: { title: '查询表格', keepAlive: true },
          component: 'views/list/tableList/index.vue',
        },
        {
          path: '/list/cardList',
          name: 'CardList',
          meta: { title: '卡片列表', keepAlive: true },
          component: 'views/list/CardList.vue',
        },
      ],
    },
    {
      path: '/exception',
      name: 'Exception',
      meta: { title: '异常页', icon: 'WarningOutlined', keepAlive: false },
      component: 'views/exception/index.vue',
      redirect: '/exception/403',
      children: [
        {
          path: '/exception/403',
          name: 'Exception403',
          meta: { title: '403', keepAlive: false },
          component: 'views/exception/403.vue',
        },
        {
          path: '/exception/404',
          name: 'Exception404',
          meta: { title: '404', keepAlive: false },
          component: 'views/exception/404.vue',
        },
        {
          path: '/exception/500',
          name: 'Exception500',
          meta: { title: '500', keepAlive: false },
          component: 'views/exception/500.vue',
        },
      ],
    },
    {
      path: '/system',
      name: 'System',
      meta: { title: '系统管理', icon: 'SettingOutlined', keepAlive: true },
      component: 'views/system/index.vue',
      redirect: '/system/role',
      children: [
        {
          path: '/system/user',
          name: 'User',
          meta: { title: '用户管理', keepAlive: true },
          component: 'views/system/user/index.vue',
        },
        {
          path: '/system/role',
          name: 'Role',
          meta: { title: '角色管理', keepAlive: true },
          component: 'views/system/role/index.vue',
        },
        {
          path: '/system/menu',
          name: 'Menu',
          meta: { title: '菜单管理', keepAlive: true },
          component: 'views/system/menu/index.vue',
        },
        {
          path: '/system/api',
          name: 'Api',
          meta: { title: 'API管理', keepAlive: true },
          component: 'views/system/api/index.vue',
        },
      ],
    },
  ];

  return menuList;
};

const menuServices: MockMethod[] = [
  {
    url: '/menu/getMenu',
    timeout: 500,
    method: 'get',
    response: (request: MockRequestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('无效token', null, 401);
      }
      return successResult(getMenu());
    },
  },
];

export default menuServices;
