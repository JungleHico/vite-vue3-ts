<template>
  <div class="welcome">
    <a-avatar v-if="avatar !== ''" class="avatar" :src="avatar" size="large" />
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts" name="Welcome">
import { useLoginStore } from '@/store/modules/loginStore';

const loginStore = useLoginStore();

const avatar = computed(() => loginStore.userInfo?.avatar || '');
const message = computed(() => {
  const username = loginStore.userInfo ? `${loginStore.userInfo.username}，` : '';
  return `欢迎你，${username}祝你开心每一天！`;
});
</script>

<style scoped lang="less">
.welcome {
  display: flex;
  align-items: center;
  .avatar {
    margin-right: 16px;
  }
}
</style>
