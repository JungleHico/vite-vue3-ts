<template>
  <a-modal :visible="visible" :mask-closable="false" width="800px" @ok="onOk">
    <a-tabs v-model:activeKey="tabsKey" @change="onChangeTabs">
      <a-tab-pane key="1" tab="菜单权限">
        <a-spin :spinning="loadingMenuAuthority">
          <a-tree
            v-model:checkedKeys="menuTreeCheckedKeys"
            :tree-data="menuList"
            checkable
            default-expand-all
            :field-names="menuTreeFieldNames"
            @check="onCheckMenuTree"
            @select="onSelectMenu"
          />
        </a-spin>
      </a-tab-pane>

      <a-tab-pane key="2" tab="API权限">
        <a-spin :spinning="loadingApiAuthority">
          <a-tree
            v-model:checkedKeys="apiTreeCheckedKeys"
            :tree-data="apiList"
            checkable
            default-expand-all
            :field-names="apiTreeFieldNames"
            @check="onCheckApiTree"
            @select="onSelectApi"
          />
        </a-spin>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script setup lang="ts">
import { getApis, getApiAuthority } from '@/api/permission';
import useMenu from './hooks/menu';
import useApi from './hooks/api';

type Props = {
  visible: boolean;
  roleId: number;
};
type Emits = {
  (event: 'ok'): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const tabsKey = ref<string>('1');

/** 菜单 */
const {
  menuList,
  menuTreeCheckedKeys,
  menuTreeFieldNames,
  loadingMenuAuthority,
  getMenuList,
  getMenuAuthorityList,
  resetMenuAuthorityList,
  onCheckMenuTree,
  onSelectMenu
} = useMenu();

/** API */
const {
  apiList,
  apiTreeCheckedKeys,
  apiTreeFieldNames,
  loadingApiAuthority,
  getApiList,
  getApiAuthorityList,
  resetApiAuthorityList,
  onCheckApiTree,
  onSelectApi
} = useApi();

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      // 打开弹窗，加载角色菜单权限
      getMenuAuthorityList(props.roleId);
    } else {
      // 关闭弹窗，重置状态
      tabsKey.value = '1';
      resetMenuAuthorityList();
      resetApiAuthorityList();
    }
  }
);

// 切换API权限，加载数据
const onChangeTabs = () => {
  if (tabsKey.value === '2' && !apiTreeCheckedKeys.value.length) {
    getApiAuthorityList(props.roleId);
  }
};
const onOk = () => {
  if (tabsKey.value === '1') {
    // TODO 菜单权限接口
  } else {
    // TODO API权限接口
  }
  emits('ok');
};

getMenuList();
getApiList();
</script>

<style scoped></style>
