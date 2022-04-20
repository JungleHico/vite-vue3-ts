import { MockMethod } from 'vite-plugin-mock';

const apiList = [
  {
    id: 1,
    path: '/api/login',
    desc: '登录',
    method: 'post',
    group: 'login'
  },
  {
    id: 2,
    path: '/api/userInfo',
    desc: '获取用户基本信息',
    method: 'get',
    group: 'login'
  },
  {
    id: 3,
    path: '/api/userMenu',
    desc: '获取用户菜单列表',
    method: 'get',
    group: 'login'
  },
  {
    id: 4,
    path: '/api/tableList',
    desc: '获取用“查询表格”数据',
    method: 'get',
    group: 'tableList'
  },
  {
    id: 5,
    path: '/api/apiList',
    desc: '获取接口列表',
    method: 'get',
    group: 'permission'
  },
  {
    id: 6,
    path: '/api/menu',
    desc: '获取菜单列表',
    method: 'get',
    group: 'permission'
  },
  {
    id: 7,
    path: '/api/roles',
    desc: '获取角色列表',
    method: 'get',
    group: 'permission'
  },
  {
    id: 8,
    path: '/api/menuAuthority',
    desc: '获取角色菜单权限',
    method: 'get',
    group: 'permission'
  }
];

const menu = [
  {
    id: 1,
    name: 'welcome',
    path: '/welcome',
    meta: {
      title: '欢迎页',
      icon: 'HomeOutlined',
      hidden: false
    },
    parentId: 0,
    sort: 0,
    component: 'views/Welcome.vue'
  },
  {
    id: 2,
    name: 'form',
    path: '/form',
    redirect: '/form/basicForm',
    meta: {
      title: '表单页',
      icon: 'FormOutlined',
      hidden: false
    },
    parentId: 0,
    sort: 1,
    component: 'layouts/PageView.vue',
    children: [
      {
        id: 3,
        name: 'basicForm',
        path: '/form/basicForm',
        meta: {
          title: '基础表单',
          icon: '',
          hidden: false
        },
        parentId: 2,
        sort: 0,
        component: 'views/form/BasicForm.vue'
      },
      {
        id: 4,
        name: 'stepForm',
        path: '/form/stepForm',
        meta: {
          title: '分步表单',
          icon: '',
          hidden: false
        },
        parentId: 2,
        sort: 1,
        component: 'views/form/StepForm.vue'
      }
    ]
  },
  {
    id: 5,
    name: 'list',
    path: '/list',
    redirect: '/list/tableList',
    meta: {
      title: '列表页',
      icon: 'TableOutlined',
      hidden: false
    },
    parentId: 0,
    sort: 2,
    component: 'layouts/PageView.vue',
    children: [
      {
        id: 6,
        name: 'tableList',
        path: '/list/tableList',
        meta: {
          title: '查询表格',
          icon: '',
          hidden: false
        },
        parentId: 5,
        sort: 0,
        component: 'views/list/tableList/index.vue'
      },
      {
        id: 7,
        name: 'cardList',
        path: '/list/cardList',
        meta: {
          title: '卡片列表',
          icon: '',
          hidden: false
        },
        parentId: 5,
        sort: 1,
        component: 'views/list/CardList.vue'
      }
    ]
  },
  {
    id: 8,
    name: 'exception',
    path: '/exception',
    redirect: '/exception/403',
    meta: {
      title: '异常页',
      icon: 'WarningOutlined',
      hidden: false
    },
    parentId: 0,
    sort: 3,
    component: 'layouts/PageView.vue',
    children: [
      {
        id: 9,
        name: 'exception403',
        path: '/exception/403',
        meta: {
          title: '403',
          icon: '',
          hidden: false
        },
        parentId: 8,
        sort: 0,
        component: 'views/exception/403.vue'
      },
      {
        id: 10,
        name: 'exception404',
        path: '/exception/404',
        meta: {
          title: '404',
          icon: '',
          hidden: false
        },
        parentId: 8,
        sort: 1,
        component: 'views/exception/404.vue'
      },
      {
        id: 11,
        name: 'exception500',
        path: '/exception/500',
        meta: {
          title: '500',
          icon: '',
          hidden: false
        },
        parentId: 8,
        sort: 2,
        component: 'views/exception/500.vue'
      }
    ]
  },
  {
    id: 12,
    name: 'system',
    path: '/system',
    redirect: '/system/permissionList',
    meta: {
      title: '系统',
      icon: 'SettingOutlined',
      hidden: false
    },
    parentId: 0,
    sort: 4,
    component: 'layouts/PageView.vue',
    children: [
      {
        id: 13,
        name: 'api',
        path: '/system/api',
        meta: {
          title: 'API管理',
          icon: '',
          hidden: false
        },
        parentId: 9,
        sort: 0,
        component: 'views/system/api/index.vue'
      },
      {
        id: 14,
        name: 'menu',
        path: '/system/menu',
        meta: {
          title: '菜单管理',
          icon: '',
          hidden: false
        },
        parentId: 9,
        sort: 1,
        component: 'views/system/menu/index.vue'
      },
      {
        id: 15,
        name: 'role',
        path: '/system/role',
        meta: {
          title: '角色管理',
          icon: '',
          hidden: false
        },
        parentId: 9,
        sort: 2,
        component: 'views/system/role/index.vue'
      }
    ]
  }
];

export default [
  // 获取api列表
  {
    url: '/api/apiList',
    method: 'get',
    timeout: 500,
    response: ({
      query
    }: MockRequestOptions): BaseResponse<ResponseList<Api>> => {
      const current = query.current ? +query.current : 1;
      const pageSize = query.pageSize ? +query.pageSize : 10;

      return {
        code: 0,
        data: {
          list: apiList.slice((current - 1) * pageSize, current * pageSize),
          total: apiList.length,
          pageSize,
          current
        },
        message: 'success'
      };
    }
  },
  // 获取所有api
  {
    url: '/api/allApis',
    method: 'get',
    timeout: 500,
    response: (): BaseResponse<Api[]> => {
      return {
        code: 0,
        data: apiList,
        message: 'success'
      };
    }
  },
  // 获取菜单列表
  {
    url: '/api/menu',
    method: 'get',
    timeout: 500,
    response: ({
      query
    }: MockRequestOptions): BaseResponse<ResponseList<MenuItem>> => {
      const current = query.current ? +query.current : 1;
      const pageSize = query.pageSize ? +query.pageSize : 10;

      return {
        code: 0,
        data: {
          list: menu.slice((current - 1) * pageSize, current * pageSize),
          total: menu.length,
          pageSize,
          current
        },
        message: 'success'
      };
    }
  },
  // 获取完整菜单
  {
    url: '/api/wholeMenu',
    method: 'get',
    timeout: 500,
    response: (): BaseResponse<MenuItem[]> => {
      return {
        code: 0,
        data: menu,
        message: 'success'
      };
    }
  },
  // 获取角色列表
  {
    url: '/api/roles',
    method: 'get',
    timeout: 500,
    response: ({
      query
    }: MockRequestOptions): BaseResponse<ResponseList<Role>> => {
      const current = query.current ? +query.current : 1;
      const pageSize = query.pageSize ? +query.pageSize : 10;
      const list = [
        {
          id: 1,
          name: 'admin',
          desc: '管理员角色'
        },
        {
          id: 2,
          name: 'vip',
          desc: '会员角色'
        }
      ];

      return {
        code: 0,
        data: {
          list: list.slice((current - 1) * pageSize, current * pageSize),
          total: list.length,
          pageSize,
          current
        },
        message: 'success'
      };
    }
  },
  // 获取角色菜单权限
  {
    url: '/api/menuAuthority',
    method: 'get',
    timeout: 500,
    response: ({
      query
    }: MockRequestOptions): BaseResponse<ResponseList<number>> => {
      let list: number[] = [];
      const list1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      const list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      if (+query.roleId === 1) {
        list = list1;
      } else if (+query.roleId === 2) {
        list = list2;
      }

      return {
        code: 0,
        data: {
          list,
          total: list.length,
          pageSize: 10,
          current: 1
        },
        message: 'success'
      };
    }
  },
  // 获取角色API权限
  {
    url: '/api/apiAuthority',
    method: 'get',
    timeout: 500,
    response: ({ query }: MockRequestOptions): BaseResponse<number[]> => {
      let list: number[] = [];
      const list1 = [1, 2, 3, 4, 5, 6, 7, 8];
      const list2 = [1, 2, 3, 4];
      if (+query.roleId === 1) {
        list = list1;
      } else if (+query.roleId === 2) {
        list = list2;
      }

      return {
        code: 0,
        data: list,
        message: 'success'
      };
    }
  }
] as MockMethod[];
