<template>
  <template v-for="item in menu" :key="item.path">
    <a-sub-menu v-if="item.children" :key="item.path">
      <template #icon>
        <ant-icon v-if="item.meta?.icon" :icon="((item.meta.icon) as string)"></ant-icon>
      </template>
      <template #title>
        {{ item.meta?.title || '' }}
      </template>
      <sidebar-menu :menu="item.children"></sidebar-menu>
    </a-sub-menu>
    <a-menu-item v-else :key="(item.path as string)">
      <router-link :to="item.path">
        <ant-icon v-if="item.meta?.icon" :icon="((item.meta.icon) as string)"></ant-icon>
        <span>{{ item.meta?.title || '' }}</span>
      </router-link>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import AntIcon from '@/components/AntIcon.vue';
import { RouteRecordRaw } from 'vue-router';

interface Props {
  menu: RouteRecordRaw[];
}

const props = defineProps<Props>();
</script>

<style scoped>
.menu-item-title {
  margin-left: 10px;
}
</style>
