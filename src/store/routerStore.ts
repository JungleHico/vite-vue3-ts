import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { constantRoutes } from '@/router/index';

type RouterStoreState = {
  routes: RouteRecordRaw[]; // 总路由表
  asyncRoutes: RouteRecordRaw[]; // 动态添加的路由表
};

export const useRouterStore = defineStore('router', {
  state: (): RouterStoreState => {
    return {
      routes: constantRoutes,
      asyncRoutes: []
    };
  },
  getters: {
    // 菜单栏渲染列表
    menus(): RouteRecordRaw[] {
      return this.routes[0].children || [];
    }
  },
  actions: {
    /**
     * @desc 递归生成动态路由表
     * @param menus 后端获取到的菜单列表
     */
    setAsyncRoutes(menus: MenuItem[]) {
      const modules = import.meta.glob('../**/*.vue');
      const routes: RouteRecordRaw[] = [];
      for (const item of menus) {
        const route: RouteRecordRaw = {
          path: item.path,
          component: markRaw(modules[`../${item.component}`]),
          meta: item.meta,
          redirect: item.redirect
        };
        if (item.children) {
          route.children = this.setAsyncRoutes(item.children);
        }
        routes.push(route);
      }
      return routes;
    },
    /**
     * @desc 生成动态路由表，并将动态路由表合并到总路由表
     * @param menus 后端获取到的菜单列表
     */
    generateRoutes(menus: MenuItem[]) {
      const asyncRoutes = [constantRoutes[0]];
      asyncRoutes[0].children = this.setAsyncRoutes(menus);
      this.asyncRoutes = asyncRoutes;
      this.routes.splice(0, 1, asyncRoutes[0]);
    }
  }
});
