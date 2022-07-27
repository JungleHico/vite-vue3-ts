<template>
  <a-layout ref="layoutMain" class="layout-main">
    <layout-sidebar></layout-sidebar>
    <a-layout class="layout-right">
      <layout-header></layout-header>
      <a-layout-content class="layout-content">
        <layout-nav @refresh="onRefresh"></layout-nav>
        <div class="content">
          <page-view v-if="showPage"></page-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LayoutSidebar from './sidebar/index.vue';
import LayoutHeader from './header/index.vue';
import LayoutNav from './nav/index.vue';
import PageView from './PageView.vue';

// 页面刷新
const showPage = ref<boolean>(true);
const onRefresh = () => {
  showPage.value = false;
  nextTick(() => {
    showPage.value = true;
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
