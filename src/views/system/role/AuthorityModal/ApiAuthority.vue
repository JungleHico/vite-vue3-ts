<template>
  <a-spin :spinning="loading">
    <a-tree
      v-if="apiList.length"
      v-model:checkedKeys="apiAuthorityIds"
      :tree-data="apiList"
      checkable
      default-expand-all
      :field-names="menuTreeFieldNames"
    />
  </a-spin>
</template>

<script setup lang="ts">
import { getAllApiList, getApiAuthority } from '@/api/system';
import { useRoleAuthority } from '@/store/roleAuthority';
import { storeToRefs } from 'pinia';

interface ApiTreeNode {
  id: string | number;
  desc: string;
  children?: ApiTreeNode[];
}

const apiList = ref<ApiTreeNode[]>([]);
const loadingCount = ref<number>(0);
const loading = computed(() => loadingCount.value > 0);
// 菜单列表自定义字段
const menuTreeFieldNames = {
  children: 'children',
  title: 'desc',
  key: 'id',
};

const roleAuthority = useRoleAuthority();
const {
  roleId, // 当前角色ID
  apiAuthorityIds, // 当前角色 API 权限
} = storeToRefs(roleAuthority);

// Api分组（转化为树形结构）
const getApiTree = (apiList: Api[]) => {
  const apiTreeList: ApiTreeNode[] = [];

  apiList.forEach((api) => {
    const apiTreeNode = {
      id: api.id,
      desc: api.desc,
    };

    if (api.group !== '') {
      const group = apiTreeList.find((group) => group.id === api.group);
      if (group) {
        // 已有分组
        group.children?.push(apiTreeNode);
      } else {
        // 新建分组
        const newGroup: ApiTreeNode = {
          id: api.group,
          desc: api.group,
          children: [],
        };
        newGroup.children?.push(apiTreeNode);
        apiTreeList.push(newGroup);
      }
    } else {
      // API未分组
      apiTreeList.push(apiTreeNode);
    }
  });

  return apiTreeList;
};

const getApiList = async () => {
  loadingCount.value++;

  try {
    const data = await getAllApiList();
    apiList.value = getApiTree(data);
  } catch (error) {
    apiList.value = [];
    return Promise.reject(error);
  } finally {
    loadingCount.value--;
  }
};

// 获取当前角色 API 权限
const getApiAuthorityList = async (roleId: number) => {
  loadingCount.value++;

  try {
    const data = await getApiAuthority(roleId);
    roleAuthority.setApiAuthorityIds(data);
  } catch (error) {
    return Promise.reject(error);
  } finally {
    loadingCount.value--;
  }
};

watch(
  roleId,
  (roleId: number) => {
    getApiAuthorityList(roleId);
  },
  { immediate: true },
);

getApiList();
</script>

<style scoped></style>
