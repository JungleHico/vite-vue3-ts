import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/permissions',
    method: 'get',
    timeout: 500,
    response: (): BaseResponse<ResponseList<Permission>> => {
      const list = [
        {
          id: 1,
          key: 'form',
          name: '表单页',
          actions: ['add', 'query', 'update', 'delete']
        },
        {
          id: 2,
          key: 'list',
          name: '列表页',
          actions: ['add', 'query', 'update', 'delete']
        }
      ];

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
  {
    url: '/api/menu',
    method: 'get',
    timeout: 500,
    response: (): BaseResponse<ResponseList<MenuItem>> => {
      const list = [
        {
          id: 1,
          name: '欢迎页',
          path: '/welcome',
          icon: 'HomeOutlined',
          hidden: false,
          parentId: 0,
          sort: 0
        },
        {
          id: 2,
          name: '表单页',
          path: '/form',
          icon: 'FormOutlined',
          hidden: false,
          parentId: 0,
          sort: 1,
          children: [
            {
              id: 3,
              name: '基础表单',
              path: '/form/basicForm',
              icon: '',
              hidden: false,
              parentId: 2,
              sort: 0
            },
            {
              id: 4,
              name: '分步表单',
              path: '/form/stepForm',
              icon: '',
              hidden: false,
              parentId: 2,
              sort: 1
            }
          ]
        },
        {
          id: 5,
          name: '列表页',
          path: '/list',
          icon: 'TableOutlined',
          hidden: false,
          parentId: 0,
          sort: 2,
          children: [
            {
              id: 6,
              name: '查询表格',
              path: '/list/tableList',
              icon: '',
              hidden: false,
              parentId: 5,
              sort: 0
            },
            {
              id: 7,
              name: '卡片列表',
              path: '/list/cardList',
              icon: '',
              hidden: false,
              parentId: 5,
              sort: 1
            }
          ]
        },
        {
          id: 8,
          name: '异常页',
          path: '/list/cardList',
          icon: 'WarningOutlined',
          hidden: false,
          parentId: 0,
          sort: 3,
          children: [
            {
              id: 10,
              name: '403',
              path: '/exception/403',
              icon: '',
              hidden: false,
              parentId: 8,
              sort: 0
            },
            {
              id: 11,
              name: '404',
              path: '/exception/404',
              icon: '',
              hidden: false,
              parentId: 8,
              sort: 1
            },
            {
              id: 12,
              name: '500',
              path: '/exception/500',
              icon: '',
              hidden: false,
              parentId: 8,
              sort: 2
            }
          ]
        },
        {
          id: 9,
          name: '系统',
          path: '/system',
          icon: 'SettingOutlined',
          hidden: false,
          parentId: 0,
          sort: 4,
          children: [
            {
              id: 13,
              name: '权限列表',
              path: '/system/permissionList',
              icon: '',
              hidden: false,
              parentId: 9,
              sort: 0
            },
            {
              id: 14,
              name: '菜单管理',
              path: '/system/menu',
              icon: '',
              hidden: false,
              parentId: 9,
              sort: 1
            },
            {
              id: 15,
              name: '角色管理',
              path: '/system/role',
              icon: '',
              hidden: false,
              parentId: 9,
              sort: 2
            }
          ]
        }
      ];

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
  {
    url: '/api/roles',
    method: 'get',
    timeout: 500,
    response: (): BaseResponse<ResponseList<Role>> => {
      const list = [
        {
          id: 1,
          name: 'admin',
          desc: '管理员角色',
          permissions: [
            {
              id: 1,
              key: 'form',
              name: '表单页',
              actions: ['add', 'query', 'update', 'delete']
            },
            {
              id: 2,
              key: 'list',
              name: '列表页',
              actions: ['add', 'query', 'update', 'delete']
            }
          ]
        },
        {
          id: 2,
          name: 'vip',
          desc: '会员角色',
          permissions: [
            {
              id: 1,
              key: 'form',
              name: '表单页',
              actions: ['query']
            },
            {
              id: 2,
              key: 'list',
              name: '列表页',
              actions: ['query']
            }
          ]
        }
      ];

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
  }
] as MockMethod[];
