import { RouteRecordRaw, useRoute, RouteLocationNormalizedLoaded } from 'vue-router';

// 获取展开开单/高亮菜单项
function getCurrentMenuKeys(menu: RouteRecordRaw[], route: RouteLocationNormalizedLoaded) {
  const keys: { openKeys: string[]; selectedKeys: string[] } = {
    openKeys: [], // 展开菜单
    selectedKeys: [], // 高亮菜单项
  };
  for (const item of menu) {
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
}

export const useMenu = (menu: RouteRecordRaw[]) => {
  const route = useRoute();

  // 展开菜单
  const openKeys = ref<string[]>([]);
  // 高亮菜单项
  const selectedKeys = ref<string[]>([]);

  const setWatchMenuEffect = () => {
    // 监听路由，高亮菜单
    watch(
      () => route.path,
      () => {
        const keys = getCurrentMenuKeys(menu, route);
        openKeys.value = keys.openKeys;
        selectedKeys.value = keys.selectedKeys;
      },
      { immediate: true },
    );
  };

  return {
    openKeys,
    selectedKeys,
    setWatchMenuEffect,
  };
};
