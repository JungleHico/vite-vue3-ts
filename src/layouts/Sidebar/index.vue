<template>
  <a-layout-sider
    v-model:collapsed="fold"
    collapsible
    :trigger="null"
    class="sidebar"
    width="256"
  >
    <div class="sidebar-header">
      <router-link to="/">
        <img class="logo" src="@/assets/images/logo.png" alt="logo" />
        <transition name="fade-in">
          <div v-if="!fold" class="sidebar-header-title">后台管理系统</div>
        </transition>
      </router-link>
    </div>
    <sidebar-menu :menus="menus"></sidebar-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue';
// import { RouteRecordRaw } from 'vue-router';
import { useRouterStore } from '@/store/routerStore';
// import { routes } from '@/router';
// import { constantRoutes } from '@/router';
// import { getMenusFromRoutes } from '@/router/utils';
import { useMenuStore } from '@/store/menuStore';
import { storeToRefs } from 'pinia';

// 菜单列表
// const menus: RouteRecordRaw[] = getMenusFromRoutes(
//   // routes.find((route: RouteRecordRaw) => route.path === '/')?.children || []
//   constantRoutes.find((route: RouteRecordRaw) => route.path === '/')
//     ?.children || []
// );
const routerStore = useRouterStore();
const menus = routerStore.menus;

// 菜单折叠/展开
const menuStore = useMenuStore();
const { fold } = storeToRefs(menuStore);
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
