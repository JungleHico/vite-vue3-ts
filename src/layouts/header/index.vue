<template>
  <a-layout-header class="layout-header">
    <div class="menu-fold-icon" @click="toggleSidebar">
      <menu-fold-outlined v-if="isFold"></menu-fold-outlined>
      <menu-unfold-outlined v-else></menu-unfold-outlined>
    </div>
    <user-menu></user-menu>
  </a-layout-header>
</template>

<script setup lang="ts">
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
  import UserMenu from './UserMenu.vue';
  import { useSidebarStore } from '@/store/sidebarStore';

  const sidebarStore = useSidebarStore();
  const { toggleSidebar } = sidebarStore;
  const isFold = computed(() => {
    return sidebarStore.isFold;
  });
</script>

<style scoped lang="less">
  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    background-color: #fff;
  }
  .menu-fold-icon {
    padding: 0 24px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover,
    &:active {
      background-color: #f5f5f5;
    }
  }
</style>
