<template>
  <a-layout-sider
    v-model:collapsed="isFold"
    collapsible
    :trigger="null"
    class="sidebar"
    width="256"
  >
    <div class="sidebar-header">
      <router-link to="/">
        <img class="logo" src="@/assets/images/logo.png" alt="logo" />
        <transition name="fade-in">
          <div v-if="!isFold" class="sidebar-header-title">后台管理系统</div>
        </transition>
      </router-link>
    </div>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
    >
      <sidebar-menu :menu="menu"></sidebar-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue';
import { useSidebarStore } from '@/store/sidebarStore';
import { usePermissionStore } from '@/store/permissionStore';
import { useMenu } from './useMenu';

// 侧边栏折叠/展开
const sidebarStore = useSidebarStore();
const isFold = computed(() => sidebarStore.isFold);

// 菜单列表
const permissionStore = usePermissionStore();
const menu = computed(() => permissionStore.menu);

// 菜单业务
const { openKeys, selectedKeys, setWatchMenuEffect } = useMenu(menu.value);

setWatchMenuEffect();
</script>

<style scoped lang="less">
.sidebar-header {
  a {
    height: 64px;
    padding: 8px;
    display: flex;
    align-items: center;
    color: #fff;
    .logo {
      width: auto;
      height: 48px;
    }
    .sidebar-header-title {
      margin-left: 16px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
