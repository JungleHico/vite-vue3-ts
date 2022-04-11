import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LayoutMain from '@/layouts/LayoutMain.vue';
import { RouterView } from 'vue-router';
import { useLoginStore } from '@/store/loginStore';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LayoutMain,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('@/views/Welcome.vue'),
        meta: { title: '欢迎页', icon: 'HomeOutlined' }
      },
      {
        path: '/form',
        component: RouterView,
        redirect: '/basicForm',
        meta: { title: '表单页', icon: 'FormOutlined' },
        children: [
          {
            path: '/basicForm',
            component: () => import('@/views/form/BasicForm.vue'),
            meta: { title: '基础表单' }
          },
          {
            path: '/stepForm',
            component: () => import('@/views/form/StepForm.vue'),
            meta: { title: '分步表单' }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
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

router.afterEach(() => {
  NProgress.done();
});

export default router;
