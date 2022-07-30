<template>
  <router-view>
    <template #default="{ Component }">
      <transition name="fade-slide" mode="out-in" appear>
        <keep-alive :include="cachedRoutes">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>

<script setup lang="ts">
import { useVisitedRoutesStore } from '@/store/modules/visitedRoutesStore';

const visitedRoutesStore = useVisitedRoutesStore();
// 缓存页面
const cachedRoutes = computed(() => visitedRoutesStore.cachedRoutes);
</script>
