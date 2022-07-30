import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { cloneDeep } from 'lodash';
import { router, constantRoutes } from '@/router';
import { MenuItem } from '../../../types/permission';
import { getMenu } from '@/api/menu';

interface PermissionState {
  routes: RouteRecordRaw[]; // 总路由表
  asyncRoutes: RouteRecordRaw[]; // 动态添加的路由表
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => {
    return {
      routes: cloneDeep(constantRoutes),
      asyncRoutes: [],
    };
  },
  getters: {
    // 侧边栏菜单
    menu(): RouteRecordRaw[] {
      return this.routes[0].children || [];
    },
  },
  actions: {
    /**
     * @desc 菜单列表转化为动态路由表
     * @param menu 从后端获取的菜单列表
     */
    setAsyncRoutes(menu: MenuItem[]) {
      const modules = import.meta.glob('../../**/*.vue'); // 动态导入页面组件
      const routes: RouteRecordRaw[] = [];
      for (const item of menu) {
        const { path, name, meta, component, redirect, children } = item;
        const route: RouteRecordRaw = {
          path,
          name,
          component: modules[`../../${component}`],
        };
        if (meta) {
          route.meta = meta;
        }
        if (redirect) {
          (route as RouteRecordRaw).redirect = redirect;
        }
        if (children) {
          (route as RouteRecordRaw).children = this.setAsyncRoutes(children);
        }
        routes.push(route);
      }
      return routes;
    },
    // 初始化路由
    async initRouter() {
      try {
        const menu: MenuItem[] = await getMenu(); // 获取菜单列表
        this.asyncRoutes = this.setAsyncRoutes(menu); // 菜单转化为动态路由表
        // 动态添加路由
        this.asyncRoutes.forEach((route) => {
          this.routes[0].children?.push(route);
          router.addRoute(constantRoutes[0].name as string, route);
        });
        // 匹配其他路由，重定向到 404
        router.addRoute({
          path: '/:pathMatch(.*)*',
          redirect: '/404',
        });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 重置路由（退出登录）
    resetRouter() {
      this.routes = cloneDeep(constantRoutes);
      this.asyncRoutes = [];
    },
  },
});
