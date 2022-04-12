<template>
  <a-result status="403" title="403" sub-title="对不起，您没有访问权限">
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
