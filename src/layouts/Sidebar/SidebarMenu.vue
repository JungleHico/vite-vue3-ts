<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="inline"
  >
    <template v-for="item in menu" :key="item.path">
      <a-sub-menu v-if="item.children" :key="item.path">
        <template #icon>
          <ant-icon v-if="item.meta?.icon" :icon="((item.meta.icon) as string)"></ant-icon>
        </template>
        <template #title>
          {{ item.meta?.title || '' }}
        </template>
        <sidebar-menu :menu="item.children"></sidebar-menu>
        <!-- <a-menu-item v-for="subItem in item.children" :key="subItem.path">
          <router-link :to="subItem.path">
            <span>{{ subItem.meta?.title || '' }}</span>
          </router-link>
        </a-menu-item> -->
      </a-sub-menu>
      <a-menu-item v-else :key="(item.path as string)">
        <router-link :to="item.path">
          <ant-icon v-if="item.meta?.icon" :icon="((item.meta.icon) as string)"></ant-icon>
          <span>{{ item.meta?.title || '' }}</span>
        </router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import AntIcon from '@/components/AntIcon.vue';
import { RouteRecordRaw, useRoute, RouteLocationNormalizedLoaded } from 'vue-router';

interface Props {
  menu: RouteRecordRaw[];
}

const props = defineProps<Props>();

const route = useRoute();
// 展开菜单
const openKeys = ref<string[]>([]);
// 高亮菜单项
const selectedKeys = ref<string[]>([]);

// 获取展开开单/高亮菜单项
const getCurrentMenuKeys = (menu: RouteRecordRaw[], route: RouteLocationNormalizedLoaded) => {
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
};

// 监听路由，高亮菜单
watch(
  () => route.path,
  () => {
    const keys = getCurrentMenuKeys(props.menu, route);
    openKeys.value = keys.openKeys;
    selectedKeys.value = keys.selectedKeys;
  },
  { immediate: true },
);
</script>

<style scoped>
.menu-item-title {
  margin-left: 10px;
}
</style>
