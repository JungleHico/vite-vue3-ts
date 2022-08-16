import { MockMethod } from 'vite-plugin-mock';
import { successResult, resultPageSuccess, errorResult, getRequestToken } from './utils';
import { Random } from 'mockjs';

function getRoleList() {
  const roleList: Role[] = [
    {
      id: 1,
      value: 'admin',
      name: '超级管理员',
      remark: '备注内容',
    },
    {
      id: 2,
      value: 'vip',
      name: '普通会员',
      remark: '',
    },
  ];
  return roleList;
}

function getUserList() {
  const userList = [];
  for (let i = 0; i < 20; i++) {
    userList.push({
      userId: i + 1,
      username: '@word(5,7)',
      nickname: '@cname',
      phone: /1[3-9]\d{9}/,
      roles: [Random.pick(getRoleList().map((role) => role.name))],
      avatar: Random.image('100x100', '#555', '#fff', '@word(1)'),
    });
  }
  return userList;
}

function getMenuList() {
  const menuList: MenuListItem[] = [
    {
      id: 1,
      parentId: null,
      sort: 0,
      path: '/form',
      name: 'Form',
      meta: { title: '表单页', icon: 'FormOutlined' },
      component: 'layouts/PageView.vue',
      redirect: '/form/basicForm',
      children: [
        {
          id: 11,
          parentId: 1,
          sort: 0,
          path: '/form/basicForm',
          name: 'BasicForm',
          meta: { title: '基础表单', keepAlive: true },
          component: 'views/form/basicForm/index.vue',
        },
        {
          id: 12,
          parentId: 1,
          sort: 0,
          path: '/form/stepForm',
          name: 'StepForm',
          meta: { title: '分步表单', keepAlive: true },
          component: 'views/form/stepForm/index.vue',
        },
      ],
    },
    {
      id: 2,
      parentId: null,
      sort: 0,
      path: '/list',
      name: 'List',
      meta: { title: '列表页', icon: 'TableOutlined' },
      component: 'layouts/PageView.vue',
      redirect: '/list/tableList',
      children: [
        {
          id: 21,
          parentId: 2,
          sort: 0,
          path: '/list/tableList',
          name: 'TableList',
          meta: { title: '查询表格', keepAlive: true },
          component: 'views/list/tableList/index.vue',
        },
        {
          id: 22,
          parentId: 2,
          sort: 0,
          path: '/list/cardList',
          name: 'CardList',
          meta: { title: '卡片列表', keepAlive: true },
          component: 'views/list/CardList.vue',
        },
      ],
    },
    {
      id: 3,
      parentId: null,
      sort: 0,
      path: '/exception',
      name: 'Exception',
      meta: { title: '异常页', icon: 'WarningOutlined' },
      component: 'layouts/PageView.vue',
      redirect: '/exception/403',
      children: [
        {
          id: 31,
          parentId: 3,
          sort: 0,
          path: '/exception/403',
          name: 'Exception403',
          meta: { title: '403', keepAlive: false },
          component: 'views/exception/403.vue',
        },
        {
          id: 32,
          parentId: 3,
          sort: 0,
          path: '/exception/404',
          name: 'Exception404',
          meta: { title: '404', keepAlive: false },
          component: 'views/exception/404.vue',
        },
        {
          id: 33,
          parentId: 3,
          sort: 0,
          path: '/exception/500',
          name: 'Exception500',
          meta: { title: '500', keepAlive: false },
          component: 'views/exception/500.vue',
        },
      ],
    },
    {
      id: 4,
      parentId: null,
      sort: 0,
      path: '/system',
      name: 'System',
      meta: { title: '系统管理', icon: 'SettingOutlined' },
      component: 'layouts/PageView.vue',
      redirect: '/system/role',
      children: [
        {
          id: 41,
          parentId: 4,
          sort: 0,
          path: '/system/user',
          name: 'User',
          meta: { title: '用户管理', keepAlive: true },
          component: 'views/system/user/index.vue',
        },
        {
          id: 42,
          parentId: 4,
          sort: 0,
          path: '/system/role',
          name: 'Role',
          meta: { title: '角色管理', keepAlive: true },
          component: 'views/system/role/index.vue',
        },
        {
          id: 43,
          parentId: 4,
          sort: 0,
          path: '/system/menu',
          name: 'Menu',
          meta: { title: '菜单管理', keepAlive: true },
          component: 'views/system/menu/index.vue',
        },
        {
          id: 44,
          parentId: 4,
          sort: 0,
          path: '/system/api',
          name: 'Api',
          meta: { title: 'API管理', keepAlive: true },
          component: 'views/system/api/index.vue',
        },
      ],
    },
  ];
  return menuList;
}

function getApiList() {
  const apiList: Api[] = [
    {
      id: 1,
      path: '/user/login',
      group: 'user',
      desc: '用户登录',
      method: 'post',
    },
    {
      id: 2,
      path: '/user/info',
      group: 'user',
      desc: '获取用户基本信息',
      method: 'get',
    },
    {
      id: 3,
      path: '/system/getUserList',
      group: 'user',
      desc: '查询用户列表',
      method: 'get',
    },
    {
      id: 4,
      path: '/menu/getMenu',
      group: 'menu',
      desc: '获取菜单',
      method: 'get',
    },
    {
      id: 5,
      path: '/system/getMenuList',
      group: 'menu',
      desc: '查询菜单列表',
      method: 'get',
    },
    {
      id: 6,
      path: '/system/getMenuAuthority',
      group: 'menu',
      desc: '查询角色菜单权限',
      method: 'get',
    },
    {
      id: 7,
      path: '/list/getTableList',
      group: 'tableList',
      desc: '查询表格',
      method: 'get',
    },
    {
      id: 8,
      path: '/system/getAllRoles',
      group: 'role',
      desc: '查询所有角色',
      method: 'get',
    },
    {
      id: 9,
      path: '/system/getApiList',
      group: 'api',
      desc: '查询API列表',
      method: 'get',
    },
    {
      id: 10,
      path: '/system/getApiAuthority',
      group: 'api',
      desc: '查询角色API权限',
      method: 'get',
    },
  ];
  return apiList;
}

const systemServices: MockMethod[] = [
  {
    url: '/system/getAllRoles',
    timeout: 500,
    method: 'get',
    response: (request: MockRequestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return errorResult('无效token', null, 401);
      }
      return successResult(getRoleList());
    },
  },
  {
    url: '/system/getUserList',
    timeout: 500,
    method: 'get',
    response: (request: MockRequestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return errorResult('无效token', null, 401);
      }
      const { query } = request;
      const { current = 1, pageSize = 10 } = query;
      return resultPageSuccess(getUserList(), current, pageSize);
    },
  },
  {
    url: '/system/getMenuList',
    timeout: 500,
    method: 'get',
    response: (request: MockRequestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return errorResult('无效token', null, 401);
      }
      return successResult(getMenuList());
    },
  },
  {
    url: '/system/getMenuAuthority',
    timeout: 500,
    response: (request: MockRequestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return errorResult('无效token', null, 401);
      }
      const { query } = request;
      const { roleId } = query;
      let menuAuthority: number[] = [];
      if (Number.parseInt(roleId) === 1) {
        menuAuthority = [1, 11, 12, 2, 21, 22, 3, 31, 32, 33, 4, 41, 42, 43, 44];
      } else {
        menuAuthority = [1, 11, 12, 2, 21, 22, 3, 31, 32, 33];
      }
      return successResult(menuAuthority);
    },
  },
  {
    url: '/system/getApiList',
    timeout: 500,
    method: 'get',
    response: (request: MockRequestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return errorResult('无效token', null, 401);
      }
      const { query } = request;
      const { current = 1, pageSize = 10 } = query;
      return resultPageSuccess(getApiList(), current, pageSize);
    },
  },
  {
    url: '/system/getAllApiList',
    timeout: 500,
    method: 'get',
    response: (request: MockRequestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return errorResult('无效token', null, 401);
      }
      return successResult(getApiList());
    },
  },
  {
    url: '/system/getApiAuthority',
    timeout: 500,
    response: (request: MockRequestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return errorResult('无效token', null, 401);
      }
      const { query } = request;
      const { roleId } = query;
      let apiAuthority: number[] = [];
      if (Number.parseInt(roleId) === 1) {
        apiAuthority = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      } else {
        apiAuthority = [1, 2, 4, 7];
      }
      return successResult(apiAuthority);
    },
  },
];

export default systemServices;
