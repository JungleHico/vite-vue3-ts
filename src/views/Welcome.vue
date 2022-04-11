<template>
  <a-alert :message="message" type="info" />
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store/loginStore';

const loginStore = useLoginStore();

const message = computed(() => {
  const username = loginStore.info ? `${loginStore.info.username}，` : '，';
  return `欢迎你，${username}祝你开心每一天！`;
});
</script>

<style scoped></style>
