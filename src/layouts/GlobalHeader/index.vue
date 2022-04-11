<template>
  <a-layout-header class="layout-header">
    <div class="menu-fold-icon" @click="onToggleMenu">
      <menu-fold-outlined v-if="fold"></menu-fold-outlined>
      <menu-unfold-outlined v-else></menu-unfold-outlined>
    </div>
    <user-menu></user-menu>
  </a-layout-header>
</template>

<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import UserMenu from './UserMenu.vue';
import { useMenuStore } from '@/store/menuStore';
import { storeToRefs } from 'pinia';

const menuStore = useMenuStore();
const { fold } = storeToRefs(menuStore);

const onToggleMenu = () => {
  menuStore.toggle();
};
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
  transition: all 0.3s;
  &:hover,
  &:active {
    background-color: #f5f5f5;
  }
}
</style>
