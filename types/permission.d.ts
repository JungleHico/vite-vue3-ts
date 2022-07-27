import { RouteMeta, RouteRecordRaw } from 'vue-router';

// 从后端获取的菜单
export interface MenuItem {
  path: string;
  name: string;
  meta?: RouteMeta;
  component: string;
  redirect?: string;
  children?: MenuItem[];
}
