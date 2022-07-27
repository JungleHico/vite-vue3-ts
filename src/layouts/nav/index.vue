<template>
  <nav class="nav-tabs">
    <a-tabs
      v-model:activeKey="activePath"
      type="editable-card"
      hide-add
      @change="onChangeTab"
      @edit="onEdit"
    >
      <a-tab-pane
        v-for="item in visitedRoutes"
        :key="item.fullPath"
        :tab="item.meta.title || item.fullPath"
        :closable="visitedRoutes.length > 1"
      >
      </a-tab-pane>
      <template #rightExtra>
        <div class="tabs-menu">
          <a-tooltip title="刷新" placement="bottom">
            <div class="tabs-menu-item" @click="onRefresh">
              <reload-outlined></reload-outlined>
            </div>
          </a-tooltip>
          <a-dropdown>
            <div class="tabs-menu-item">
              <more-outlined></more-outlined>
            </div>
            <template #overlay>
              <a-menu @click="onClickMenu">
                <a-menu-item key="1">
                  <a><close-outlined class="tabs-menu-item-icon"></close-outlined>关闭其他</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <a
                    ><arrow-left-outlined class="tabs-menu-item-icon"></arrow-left-outlined
                    >关闭左侧</a
                  >
                </a-menu-item>
                <a-menu-item key="3">
                  <a
                    ><arrow-right-outlined class="tabs-menu-item-icon"></arrow-right-outlined
                    >关闭右侧</a
                  >
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </template>
    </a-tabs>
  </nav>
  <breadcrumb-nav></breadcrumb-nav>
</template>

<script setup lang="ts">
import BreadcrumbNav from './BreadcrumbNav.vue';
import {
  ReloadOutlined,
  MoreOutlined,
  CloseOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons-vue';
import { useVisitedRoutesStore } from '@/store/visitedRoutesStore';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute, RouteLocationNormalized } from 'vue-router';

interface Emits {
  (event: 'refresh'): void;
}

const emits = defineEmits<Emits>();

const router = useRouter();
const route = useRoute();
const visitedRoutesStore = useVisitedRoutesStore();
const { activePath, visitedRoutes } = storeToRefs(visitedRoutesStore);

// 关闭当前标签页，则跳转到上一个标签页
const updateActivePath = () => {
  const exist = visitedRoutes.value.some(
    (visitedRoute: RouteLocationNormalized) => visitedRoute.fullPath === activePath.value,
  );
  if (!exist) {
    router.push(visitedRoutes.value[visitedRoutes.value.length - 1].fullPath);
  }
};

// 点击标签切换页面
const onChangeTab = (fullPath: string) => {
  router.push(fullPath);
};

// 关闭标签页
const onEdit = (fullPath: string, action: string) => {
  if (action === 'remove') {
    visitedRoutesStore.removeVisitedRoute(fullPath);
    updateActivePath();
  }
};

// 通知父组件刷新页面
const onRefresh = () => {
  emits('refresh');
};

// 导航菜单
const onClickMenu = ({ key }: any) => {
  if (key === '1') {
    visitedRoutesStore.removeOthers();
  } else if (key === '2') {
    visitedRoutesStore.removeToTheLeft();
  } else {
    visitedRoutesStore.removeToTheRight();
  }
};
</script>

<style scoped lang="less">
.nav-tabs {
  margin-top: 2px;
  padding-left: 16px;
  background-color: #fff;
}
.tabs-menu {
  display: flex;
  margin-right: 8px;
  .tabs-menu-item {
    padding: 12px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active {
      background-color: #f5f5f5;
    }
  }
  .tabs-menu-dropdown-item-icon {
    margin-right: 4px;
  }
}
</style>
