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
