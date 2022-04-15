import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LayoutMain from '@/layouts/LayoutMain.vue';
import { RouterView } from 'vue-router';
import { useLoginStore } from '@/store/loginStore';
import { useVisitedRoutesStore } from '@/store/visitedRoutesStore';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LayoutMain,
    redirect: '/welcome',
    meta: { title: '首页' },
    children: [
      {
        path: '/welcome',
        component: () => import('@/views/Welcome.vue'),
        meta: { title: '欢迎页', icon: 'HomeOutlined' }
      },
      {
        path: '/form',
        component: RouterView,
        redirect: '/form/basicForm',
        meta: { title: '表单页', icon: 'FormOutlined' },
        children: [
          {
            path: '/form/basicForm',
            component: () => import('@/views/form/BasicForm.vue'),
            meta: { title: '基础表单' }
          },
          {
            path: '/form/stepForm',
            component: () => import('@/views/form/StepForm.vue'),
            meta: { title: '分步表单' }
          }
        ]
      },
      {
        path: '/list',
        component: RouterView,
        redirect: '/list/tableList',
        meta: { title: '列表页', icon: 'TableOutlined' },
        children: [
          {
            path: '/list/tableList',
            component: () => import('@/views/list/TableList/index.vue'),
            meta: { title: '查询表格' }
          },
          {
            path: '/list/cardList',
            component: () => import('@/views/list/CardList.vue'),
            meta: { title: '卡片列表' }
          }
        ]
      },
      {
        path: '/exception',
        component: RouterView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'WarningOutlined' },
        children: [
          {
            path: '/exception/403',
            component: () => import('@/views/exception/403.vue'),
            meta: { title: '403' }
          },
          {
            path: '/exception/404',
            component: () => import('@/views/exception/404.vue'),
            meta: { title: '404' }
          },
          {
            path: '/exception/500',
            component: () => import('@/views/exception/500.vue'),
            meta: { title: '500' }
          }
        ]
      },
      {
        path: '/system',
        component: RouterView,
        redirect: '/system/permissionList',
        meta: { title: '系统', icon: 'SettingOutlined' },
        children: [
          {
            path: '/system/permissionList',
            component: () => import('@/views/system/permission/index.vue'),
            meta: { title: '权限列表' }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(''),
  routes
});

// 免登录白名单
const whiteList = ['/login', '/404'];

// 路由守卫，登录拦截
router.beforeEach(async (to, from) => {
  NProgress.start();
  const token = localStorage.getItem('token');
  if (token) {
    // 有token
    const loginStore = useLoginStore();
    if (loginStore.info) {
      // 有用户信息，说明已登录
      if (to.path === '/login') {
        // 如果是登录页，则重定向到首页
        return '/';
      }
      return true;
    }
    // 有token，无用户信息（刷新页面）
    try {
      await loginStore.getUserInfo();
      return true;
    } catch (error) {
      loginStore.logout();
      return '/login';
    }
  } else {
    // 无token（未登录/退出登录）
    if (whiteList.includes(to.path)) {
      // 免登录白名单，正常访问（避免死循环）
      return true;
    }
    // 重定向到登录页
    return '/login';
  }
});

router.afterEach((to) => {
  NProgress.done();
  // 添加已访问路由
  const visitedRoutesStore = useVisitedRoutesStore();
  visitedRoutesStore.addVisitedRoutes(to);
  visitedRoutesStore.activePath = to.fullPath;
  // 设置面包屑导航
  visitedRoutesStore.setBreadcrumb(to);
});

export default router;
