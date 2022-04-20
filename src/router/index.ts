import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LayoutMain from '@/layouts/LayoutMain.vue';
// import PageView from '@/layouts/PageView.vue';
import { useLoginStore } from '@/store/loginStore';
import { useVisitedRoutesStore } from '@/store/visitedRoutesStore';
import { useRouterStore } from '@/store/routerStore';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getUserMenu } from '@/api/login';

// 通用路由表
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LayoutMain,
    name: 'home',
    redirect: '/welcome',
    meta: { title: '首页' },
    children: []
    // children: [
    //   {
    //     path: '/welcome',
    //     component: () => import('@/views/Welcome.vue'),
    //     name: 'welcome',
    //     meta: { title: '欢迎页', icon: 'HomeOutlined' }
    //   },
    //   {
    //     path: '/form',
    //     component: PageView,
    //     name: 'form',
    //     redirect: '/form/basicForm',
    //     meta: { title: '表单页', icon: 'FormOutlined' },
    //     children: [
    //       {
    //         path: '/form/basicForm',
    //         component: () => import('@/views/form/BasicForm.vue'),
    //         name: 'basicForm',
    //         meta: { title: '基础表单' }
    //       },
    //       {
    //         path: '/form/stepForm',
    //         component: () => import('@/views/form/StepForm.vue'),
    //         name: 'stepForm',
    //         meta: { title: '分步表单' }
    //       }
    //     ]
    //   },
    //   {
    //     path: '/list',
    //     component: PageView,
    //     name: 'list',
    //     redirect: '/list/tableList',
    //     meta: { title: '列表页', icon: 'TableOutlined' },
    //     children: [
    //       {
    //         path: '/list/tableList',
    //         component: () => import('@/views/list/tableList/index.vue'),
    //         name: 'tableList',
    //         meta: { title: '查询表格' }
    //       },
    //       {
    //         path: '/list/cardList',
    //         component: () => import('@/views/list/CardList.vue'),
    //         name: 'cardList',
    //         meta: { title: '卡片列表' }
    //       }
    //     ]
    //   },
    //   {
    //     path: '/exception',
    //     component: PageView,
    //     name: 'exception',
    //     redirect: '/exception/403',
    //     meta: { title: '异常页', icon: 'WarningOutlined' },
    //     children: [
    //       {
    //         path: '/exception/403',
    //         component: () => import('@/views/exception/403.vue'),
    //         name: 'exception403',
    //         meta: { title: '403' }
    //       },
    //       {
    //         path: '/exception/404',
    //         component: () => import('@/views/exception/404.vue'),
    //         name: 'exception404',
    //         meta: { title: '404' }
    //       },
    //       {
    //         path: '/exception/500',
    //         component: () => import('@/views/exception/500.vue'),
    //         name: 'exception500',
    //         meta: { title: '500' }
    //       }
    //     ]
    //   },
    //   {
    //     path: '/system',
    //     component: PageView,
    //     name: 'system',
    //     redirect: '/system/permissionList',
    //     meta: { title: '系统', icon: 'SettingOutlined' },
    //     children: [
    //       {
    //         path: '/system/permissionList',
    //         component: () => import('@/views/system/permission/index.vue'),
    //         name: 'permission',
    //         meta: { title: '权限列表' }
    //       },
    //       {
    //         path: '/system/menu',
    //         component: () => import('@/views/system/menu/index.vue'),
    //         name: 'menu',
    //         meta: { title: '菜单管理' }
    //       },
    //       {
    //         path: '/system/role',
    //         component: () => import('@/views/system/role/index.vue'),
    //         name: 'role',
    //         meta: { title: '角色管理' }
    //       }
    //     ]
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    name: 'login',
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404.vue'),
    meta: { hidden: true }
  }
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404'
  // }
];

const router = createRouter({
  history: createWebHistory(''),
  routes: constantRoutes
});

// 免登录白名单
const whiteList = ['/login', '/404'];

// 获取用户路由表
const getRoutes = async () => {
  const routerStore = useRouterStore();
  const menus = await getUserMenu();
  routerStore.generateRoutes(menus);
  // 动态添加路由
  if (routerStore.asyncRoutes[0]?.children) {
    routerStore.asyncRoutes[0].children.forEach((route: RouteRecordRaw) => {
      router.addRoute('home', route);
    });
  }
  // 匹配其他路由，重定向到404
  router.addRoute({
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  });
};

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
      // 获取用户路由表
      await getRoutes();
      // 重定向到当前页面，避免路由未更新
      return { ...to, replace: true };
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
