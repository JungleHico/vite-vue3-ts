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
    menus(): RouteRecordRaw[] {
      return this.routes[0].children || [];
    }
  },
  actions: {
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
    generateRoutes(menus: MenuItem[]) {
      const asyncRoutes = [constantRoutes[0]];
      asyncRoutes[0].children = this.setAsyncRoutes(menus);
      this.asyncRoutes = asyncRoutes;
      this.routes.splice(0, 1, asyncRoutes[0]);
    }
  }
});
