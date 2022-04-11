<template>
  <a-dropdown>
    <div class="user-info">
      <a-avatar :src="avatar"></a-avatar>
      {{ username }}
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="onLogout">
          <template #icon>
            <logout-outlined></logout-outlined>
          </template>
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { LogoutOutlined } from '@ant-design/icons-vue';
import { useLoginStore } from '@/store/loginStore';
import { storeToRefs } from 'pinia';
import ConfirmModal from '@/plugins/ConfirmModal';

const loginStore = useLoginStore();
const { info } = storeToRefs(loginStore);
const avatar = computed(() => info.value?.avatar || '');
const username = computed(() => info.value?.username);

const onLogout = () => {
  ConfirmModal.error({
    title: '是否退出登录？',
    onOk() {
      loginStore.logout();
      window.location.reload();
    },
    onCancel() {}
  });
};
</script>

<style scoped lang="less">
.user-info {
  padding: 0 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #f5f5f5;
  }
}
</style>
