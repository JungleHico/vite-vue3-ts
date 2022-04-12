<template>
  <a-result status="500" title="500" sub-title="对不起，服务器出错了">
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
