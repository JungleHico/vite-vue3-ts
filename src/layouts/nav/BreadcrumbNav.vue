<template>
  <div class="breadcrumb-nav">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(route, index) in breadList" :key="route.path">
        <router-link v-if="index < breadList.length - 1" :to="route.path">
          {{ route.meta?.title || route.path }}
        </router-link>
        <span v-else>{{ route.meta?.title || route.path }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useVisitedRoutesStore } from '@/store/modules/visitedRoutesStore';
import { storeToRefs } from 'pinia';

const visitedRoutesStore = useVisitedRoutesStore();
const { breadList } = storeToRefs(visitedRoutesStore);
</script>

<style scoped>
.breadcrumb-nav {
  background-color: #fff;
  padding: 0 16px 16px;
}
</style>
