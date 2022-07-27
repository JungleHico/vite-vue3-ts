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
    <sidebar-menu :menu="menu"></sidebar-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue';
import { useSidebarStore } from '@/store/sidebarStore';
import { usePermissionStore } from '@/store/permissionStore';

const sidebarStore = useSidebarStore();
const isFold = computed(() => {
  return sidebarStore.isFold;
});

const permissionStore = usePermissionStore();
// const menu = permissionStore.menu;
const menu = computed(() => permissionStore.menu);
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
