import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';

// 获取菜单
export const getMenusFromRoutes = (
  routes: RouteRecordRaw[]
): RouteRecordRaw[] => {
  const menus = routes.filter((route: RouteRecordRaw, index: number) => {
    if (route.meta?.hidden) {
      return false;
    }
    if (route.children?.length) {
      route.children = getMenusFromRoutes(route.children);
    }
    return true;
  });
  return menus;
};

// 获取展开开单/高亮菜单项
export const getCurrentMenuKeys = (
  menus: RouteRecordRaw[],
  route: RouteLocationNormalizedLoaded
) => {
  const keys: { openKeys: string[]; selectedKeys: string[] } = {
    openKeys: [], // 展开菜单
    selectedKeys: [] // 高亮菜单项
  };
  for (const item of menus) {
    if (item.path === route.path) {
      keys.selectedKeys = [item.path];
      return keys;
    }
    if (item.children) {
      keys.openKeys.push(item.path);
      const childrenKeys = getCurrentMenuKeys(item.children, route);
      if (childrenKeys.selectedKeys.length) {
        keys.openKeys.push(...childrenKeys.openKeys);
        keys.selectedKeys = childrenKeys.selectedKeys;
        return keys;
      } else {
        keys.openKeys = [];
      }
    }
  }
  return keys;
};
