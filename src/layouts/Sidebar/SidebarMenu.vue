<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="inline"
  >
    <template v-for="item in menus">
      <a-sub-menu v-if="item.children" :key="item.path">
        <template #icon>
          <ant-icon
            v-if="item.meta?.icon && item.meta.icon !== ''"
            :icon="(item.meta.icon as string)"
          ></ant-icon>
        </template>
        <template #title>
          {{ item.meta?.title || '' }}
        </template>
        <template v-if="item.children">
          <a-menu-item v-for="subItem in item.children" :key="subItem.path">
            <router-link :to="subItem.path">
              <ant-icon
                v-if="subItem.meta?.icon"
                :icon="(subItem.meta.icon as string)"
              ></ant-icon>
              <span class="menu-item-title">{{
                subItem.meta?.title || ''
              }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </a-sub-menu>
      <a-menu-item v-else :key="(item.path as string)">
        <router-link :to="item.path">
          <ant-icon
            v-if="item.meta?.icon"
            :icon="(item.meta.icon as string)"
          ></ant-icon>
          <span class="menu-item-title">{{ item.meta?.title || '' }}</span>
        </router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import AntIcon from '@/components/AntIcon.vue';
import { RouteRecordRaw } from 'vue-router';
import { useRoute } from 'vue-router';
import { getCurrentMenuKeys } from '@/router/utils';

type Props = {
  menus: RouteRecordRaw[];
};

const props = defineProps<Props>();

const route = useRoute();
// 展开菜单
const openKeys = ref<string[]>([]);
// 高亮菜单项
const selectedKeys = ref<string[]>([]);

// 监听路由，高亮菜单
watch(
  () => route.path,
  () => {
    const keys = getCurrentMenuKeys(props.menus, route);
    openKeys.value = keys.openKeys;
    selectedKeys.value = keys.selectedKeys;
  },
  { immediate: true }
);
</script>

<style scoped>
.menu-item-title {
  margin-left: 10px;
}
</style>
