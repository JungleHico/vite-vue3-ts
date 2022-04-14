import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

type visitedRoutesState = {
  visitedRoutes: RouteLocationNormalized[];
  activePath: string;
};

export const useVisitedRoutesStore = defineStore('visitedRoutes', {
  state: (): visitedRoutesState => {
    return {
      visitedRoutes: [], // 已访问路由
      activePath: '' // 当前路径
    };
  },
  actions: {
    addVisitedRoutes(route: RouteLocationNormalized) {
      const exist = this.visitedRoutes.some(
        (visitedRoute: RouteLocationNormalized) =>
          visitedRoute.fullPath === route.fullPath
      );
      if (!exist) {
        this.visitedRoutes.push(route);
      }
    },
    // 移除当前路由
    removeVisitedRoute(fullPath: string) {
      const index = this.visitedRoutes.findIndex(
        (visitedRoute: RouteLocationNormalized) =>
          visitedRoute.fullPath === fullPath
      );
      if (index >= 0) {
        this.visitedRoutes.splice(index, 1);
      }
    },
    // 移除其他路由
    removeOthers() {
      this.visitedRoutes = this.visitedRoutes.filter(
        (visitedRoute: RouteLocationNormalized) =>
          visitedRoute.fullPath === this.activePath
      );
    },
    // 移除左侧路由
    removeToTheLeft() {
      const index = this.visitedRoutes.findIndex(
        (visitedRoute: RouteLocationNormalized) =>
          visitedRoute.fullPath === this.activePath
      );
      this.visitedRoutes = this.visitedRoutes.slice(index);
    },
    // 移除右侧路由
    removeToTheRight() {
      const index = this.visitedRoutes.findIndex(
        (visitedRoute: RouteLocationNormalized) =>
          visitedRoute.fullPath === this.activePath
      );
      this.visitedRoutes = this.visitedRoutes.slice(0, index + 1);
    }
  }
});