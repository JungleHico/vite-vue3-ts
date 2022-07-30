<template>
  <a-spin :spinning="loading">
    <a-tree
      v-if="menuList.length"
      v-model:checkedKeys="menuAuthorityIds"
      :tree-data="menuList"
      checkable
      default-expand-all
      :field-names="menuTreeFieldNames"
    ></a-tree>
  </a-spin>
</template>

<script setup lang="ts">
import { getMenuList, getMenuAuthority } from '@/api/system';
import { useRoleAuthority } from '@/store/modules/roleAuthority';
import { storeToRefs } from 'pinia';

const menuList = ref<MenuListItem[]>([]); // 菜单列表
const loadingCount = ref<number>(0);
const loading = computed(() => loadingCount.value > 0);
// 菜单列表自定义字段
const menuTreeFieldNames = {
  children: 'children',
  title: 'name',
  key: 'id',
};

const roleAuthority = useRoleAuthority();
const {
  roleId, // 当前角色ID
  menuAuthorityIds, // 当前角色菜单权限
} = storeToRefs(roleAuthority);

const getList = async () => {
  loadingCount.value++;

  try {
    const data = await getMenuList();
    menuList.value = data;
  } catch (error) {
    menuList.value = [];
    return Promise.reject(error);
  } finally {
    loadingCount.value--;
  }
};

// 获取当前角色菜单权限
const getMenuAuthorityList = async (roleId: number) => {
  loadingCount.value++;
  roleAuthority.setMenuAuthorityIds([]);

  try {
    const data = await getMenuAuthority(roleId);
    roleAuthority.setMenuAuthorityIds(data);
  } catch (error) {
    return Promise.reject(error);
  } finally {
    loadingCount.value--;
  }
};

watch(
  roleId,
  (roleId: number) => {
    getMenuAuthorityList(roleId);
  },
  { immediate: true },
);

getList();
</script>

<style scoped></style>
