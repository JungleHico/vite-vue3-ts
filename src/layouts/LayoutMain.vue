<template>
  <a-layout class="layout-main">
    <sidebar></sidebar>
    <a-layout class="layout-right">
      <global-header></global-header>
      <a-layout-content class="layout-content">
        <page-header @refresh="onRefresh"></page-header>
        <div v-if="showContent" class="content">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar/index.vue';
import GlobalHeader from './GlobalHeader/index.vue';
import PageHeader from './PageHeader/index.vue';

const showContent = ref<boolean>(true);

const onRefresh = () => {
  showContent.value = false;
  nextTick(() => {
    showContent.value = true;
  });
};
</script>

<style scoped lang="less">
.layout-main {
  height: 100vh;
  .layout-right {
    height: 100vh;
    overflow-y: auto;
    .layout-content {
      background-color: #f5f5f5;
      .content {
        margin: 16px;
        padding: 16px;
        background-color: #fff;
      }
    }
  }
}
</style>
