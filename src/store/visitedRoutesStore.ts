import { defineStore } from 'pinia';
import { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';

interface visitedRoutesState {
  visitedRoutes: RouteLocationNormalized[]; // 已访问路由
  activePath: string; // 当前路径
  breadList: RouteRecordNormalized[]; // 面包屑导航列表
}

// 页面导航状态管理
export const useVisitedRoutesStore = defineStore('visitedRoutesStore', {
  state: (): visitedRoutesState => {
    return {
      visitedRoutes: [],
      activePath: '',
      breadList: [],
    };
  },
  getters: {
    cachedRoutes(): string[] {
      return this.visitedRoutes
        .filter((route) => route.meta.keepAlive)
        .map((route) => route.name as string);
    },
  },
  actions: {
    // 添加已访问路由
    addVisitedRoutes(route: RouteLocationNormalized) {
      if (!route.meta.hidden) {
        const exist = this.visitedRoutes.some(
          (visitedRoute: RouteLocationNormalized) => visitedRoute.fullPath === route.fullPath,
        );
        if (!exist) {
          this.visitedRoutes.push(route);
        }
      }
    },
    // 移除当前路由
    removeVisitedRoute(fullPath: string) {
      const index = this.visitedRoutes.findIndex(
        (visitedRoute: RouteLocationNormalized) => visitedRoute.fullPath === fullPath,
      );
      if (index >= 0) {
        this.visitedRoutes.splice(index, 1);
      }
    },
    // 移除其他路由
    removeOthers() {
      this.visitedRoutes = this.visitedRoutes.filter(
        (visitedRoute: RouteLocationNormalized) => visitedRoute.fullPath === this.activePath,
      );
    },
    // 移除左侧路由
    removeToTheLeft() {
      const index = this.visitedRoutes.findIndex(
        (visitedRoute: RouteLocationNormalized) => visitedRoute.fullPath === this.activePath,
      );
      this.visitedRoutes = this.visitedRoutes.slice(index);
    },
    // 移除右侧路由
    removeToTheRight() {
      const index = this.visitedRoutes.findIndex(
        (visitedRoute: RouteLocationNormalized) => visitedRoute.fullPath === this.activePath,
      );
      this.visitedRoutes = this.visitedRoutes.slice(0, index + 1);
    },
    // 面包屑导航
    setBreadcrumb(route: RouteLocationNormalized) {
      this.breadList = [];
      route.matched.forEach((item: RouteRecordNormalized) => {
        this.breadList.push(item);
      });
    },
  },
});
