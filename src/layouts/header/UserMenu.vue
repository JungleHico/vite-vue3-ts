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
import { useLoginStore } from '@/store/modules/loginStore';
import ConfirmModal from '@/plugins/ConfirmModal';
import { usePermissionStore } from '@/store/modules/permissionStore';
import { useRouter } from 'vue-router';

const loginStore = useLoginStore();
const userInfo = computed(() => loginStore.userInfo);
const username = computed(() => userInfo.value?.username || '');
const avatar = computed(() => userInfo.value?.avatar || '');
const permissionStore = usePermissionStore();
const router = useRouter();

const onLogout = () => {
  ConfirmModal.error({
    title: '是否退出登录？',
    async onOk() {
      await loginStore.logout();
      permissionStore.resetRouter();
      router.push('/login');
    },
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
