<template>
  <a-result status="404" title="404" sub-title="对不起，您访问的页面不存在">
    <template #extra>
      <a-button type="primary" @click="onBackHome">首页</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const onBackHome = () => {
  router.push('/');
};
</script>

<style scoped></style>
