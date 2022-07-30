<template>
  <a-modal
    :visible="visible"
    :confirm-loading="confirmLoading"
    :mask-closable="false"
    width="800px"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-tabs v-model:activeKey="tabsKey">
      <a-tab-pane key="1" tab="菜单权限">
        <menu-authority></menu-authority>
      </a-tab-pane>
      <a-tab-pane key="2" tab="API权限">
        <api-authority></api-authority>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script setup lang="ts">
import MenuAuthority from './MenuAuthority.vue';
import ApiAuthority from './ApiAuthority.vue';
import { useRoleAuthority } from '@/store/modules/roleAuthority';
import { storeToRefs } from 'pinia';

interface Props {
  visible: boolean;
}
interface Emits {
  (event: 'update:visible', value: boolean): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const confirmLoading = ref<boolean>(false);
const tabsKey = ref<string>('1');

const roleAuthority = useRoleAuthority();
const { menuAuthorityIds, apiAuthorityIds } = storeToRefs(roleAuthority);

const onCancel = () => {
  emits('update:visible', false);
};

const onOk = async () => {
  confirmLoading.value = true;

  try {
    if (tabsKey.value === '1') {
      // 菜单权限
      console.log('勾选菜单权限：', menuAuthorityIds.value);
    } else {
      // API权限
      console.log('勾选API权限：', apiAuthorityIds.value);
    }
    // 模拟接口
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    emits('update:visible', false);
    // 修改权限后刷新页面
    window.location.reload();
  } catch (error) {
    return Promise.reject(error);
  } finally {
    confirmLoading.value = false;
  }
};
</script>

<style scoped></style>
