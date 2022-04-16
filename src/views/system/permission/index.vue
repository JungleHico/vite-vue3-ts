<template>
  <div class="table-wrapper" ref="tableRef">
    <a-table
      :columns="permissionsColumns"
      :data-source="permissionList"
      :pagination="pagination"
      :loading="loading"
      :size="tableSize"
    >
      <template #title>
        <table-toolbar
          title="权限列表"
          v-model:size="tableSize"
          create-button-text="新增权限"
          :table-ref="tableRef"
          @create="onCreate"
          @refresh="onRefresh"
        ></table-toolbar>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'actions'">
          <a-tag v-for="action in text" :key="action">{{ action }}</a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space size="middle">
            <a @click="onEdit(record)">编辑</a>
            <a-popconfirm
              title="确定删除当前内容吗？"
              ok-text="删除"
              cancel-text="取消"
              :ok-button-props="{ danger: true }"
              @confirm="onRemove(record)"
            >
              <a>删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <permission-modal
    v-model:visible="showModal"
    :mask-closable="false"
    :action="action"
    create-title="新增权限"
    edit-title="编辑权限"
    :data="currentItem"
    @cancel="onCancel"
    @ok="onOk"
  ></permission-modal>
</template>

<script setup lang="ts">
import TableToolbar from '@/components/TabToolbar.vue';
import PermissionModal from './PermissionModal.vue';
import { permissionsColumns } from '@/utils/table';
import { getPermissions } from '@/api/permission';

const tableRef = ref();
const permissionList = reactive<Permission[]>([]);
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});
const loading = ref<boolean>(false);
const tableSize = ref<TableSize>('default');
// 弹窗
const showModal = ref<boolean>(false);
const action = ref<Action>('create');
const currentItem = ref<Permission | null>(null);

const getPermissionList = async () => {
  loading.value = true;

  try {
    const res = await getPermissions();
    permissionList.splice(0, permissionList.length, ...res.list);
    pagination.total = res.total;
  } catch (error) {
    permissionList.splice(0, permissionList.length);
    return Promise.reject(error);
  } finally {
    loading.value = false;
  }
};

// 刷新
const onRefresh = () => {
  getPermissionList();
};
// 新增
const onCreate = () => {
  action.value = 'create';
  showModal.value = true;
};
// 编辑
const onEdit = (record: Permission) => {
  action.value = 'edit';
  currentItem.value = record;
  showModal.value = true;
};
const onCancel = () => {
  showModal.value = false;
};
const onOk = () => {
  showModal.value = false;
  getPermissionList();
};
// 删除
const onRemove = (record: TableListItem) => {
  loading.value = true;
  // TODO 删除接口
  setTimeout(() => {
    loading.value = false;
    getPermissionList();
  }, 1000);
};

getPermissionList();
</script>

<style scoped></style>
