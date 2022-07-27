<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="slide" mode="out-in" appear>
        <keep-alive :include="cachedRoutes">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>

<script setup lang="ts">
import { useVisitedRoutesStore } from '@/store/visitedRoutesStore';

// 缓存页面
const visitedRoutesStore = useVisitedRoutesStore();
const cachedRoutes = computed(() => visitedRoutesStore.cachedRoutes);
</script>
