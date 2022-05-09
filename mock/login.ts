import md5 from 'blueimp-md5';
import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import JsonWebToken from './JsonWebToken';

const loginServices: MockMethod[] = [
  // 登录
  {
    url: '/api/login',
    method: 'post',
    timeout: 500,
    response: ({ body }: MockRequestOptions): BaseResponse<Token | null> => {
      const { account, password } = body;
      const users = [{ account: 'admin', password: md5('1234') }];
      let pass = false;
      for (const user of users) {
        if (account === user.account && password === user.password) {
          pass = true;
          break;
        }
      }

      if (!pass) {
        return {
          code: 400,
          data: null,
          message: '帐号密码错误'
        };
      }
      return {
        code: 0,
        data: {
          token: JsonWebToken.generateToken({ account })
        },
        message: 'success'
      };
    }
  },
  // 获取用户基本信息
  {
    url: '/api/userInfo',
    method: 'get',
    timeout: 500,
    response: ({
      headers
    }: MockRequestOptions): BaseResponse<UserInfo | null> => {
      const data = {
        account: 'admin',
        username: '超级管理员',
        avatar: Random.image('100x100', '#ccc', '#f00', 'a')
      };

      return JsonWebToken.getAuthData<UserInfo>(headers.authorization, data);
    }
  },
  // 获取用户菜单列表
  {
    url: '/api/userMenu',
    method: 'get',
    timeout: 500,
    response: ({
      headers
    }: MockRequestOptions): BaseResponse<MenuItem[] | null> => {
      const list = [
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
            },
            {
              id: 16,
              name: 'user',
              path: '/system/user',
              meta: {
                title: '用户管理',
                icon: '',
                hidden: false
              },
              parentId: 9,
              sort: 2,
              component: 'views/system/user/index.vue'
            }
          ]
        }
      ];

      return JsonWebToken.getAuthData<MenuItem[]>(headers.authorization, list);
    }
  }
];

export default loginServices;
