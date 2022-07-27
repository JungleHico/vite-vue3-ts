import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LayoutMain from '@/layouts/LayoutMain.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useLoginStore } from '@/store/loginStore';
import { usePermissionStore } from '@/store/permissionStore';
import { useVisitedRoutesStore } from '@/store/visitedRoutesStore';

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    component: LayoutMain,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        meta: { title: '欢迎页', icon: 'HomeOutlined' },
        component: () => import('@/views/Welcome.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: { hidden: true },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: { hidden: true },
    component: () => import('@/views/exception/404.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404',
  // },
];

const router = createRouter({
  history: createWebHistory(''),
  routes: constantRoutes,
});

// 免登录白名单
const whiteList = ['/login', '/404'];
// 登录页
const LOGIN_PATH = '/login';

// 路由守卫，登录拦截
router.beforeEach(async (to, from) => {
  NProgress.start();
  const token = localStorage.getItem('token');

  if (token) {
    // 有 token
    const loginStore = useLoginStore();
    if (loginStore.userInfo) {
      // 有用户信息，说明已登录
      if (to.path === LOGIN_PATH) {
        // 如果是登录页，则重定向到首页
        return '/';
      }
      return true;
    }
    // 有 token，无用户信息（刷新页面）
    try {
      const permissionStore = usePermissionStore();
      // 重新获取用户信息
      await loginStore.getUserInfo();
      // 生成用户路由表
      await permissionStore.initRouter();
      // 重定向到当前页面，避免路由未更新
      return { ...to, replace: true };
    } catch (error) {
      await loginStore.logout();
      return LOGIN_PATH;
    }
  } else {
    // 无 token（未登录/退出登录）
    if (whiteList.includes(to.path)) {
      // 免登录白名单，正常访问（避免登录页死循环）
      return true;
    }
    // 重定向到登录页
    return { path: LOGIN_PATH, query: { redirect: to.fullPath } };
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
