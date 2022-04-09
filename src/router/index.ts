import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/components/Home.vue';
import { useLoginStore } from '@/store/loginStore';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home
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

export default router;
