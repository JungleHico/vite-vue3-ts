<template>
  <div class="table-wrapper" ref="tableRef">
    <a-table
      :columns="rolesColumns"
      :data-source="roleList"
      :size="tableSize"
      :loading="loading"
      :row-key="setRowKey"
      :expanded-row-keys="expandedRowKeys"
      @expand="onExpand"
    >
      <template #title>
        <table-toolbar
          title="角色列表"
          v-model:size="tableSize"
          create-button-text="新增角色"
          :table-ref="tableRef"
          @create="onCreate"
          @refresh="onRefresh"
        ></table-toolbar>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'action'">
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

      <template #expandedRowRender="{ record }">
        <a-descriptions :column="2">
          <a-descriptions-item
            v-for="permission in record.permissions"
            :key="permission.key"
            :label="permission.name"
          >
            <a-tag
              v-for="action in permission.actions"
              :key="action"
              color="cyan"
            >
              {{ action }}
            </a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </template>
    </a-table>
  </div>

  <role-modal
    v-model:visible="showModal"
    :mask-closable="false"
    :action="action"
    :data="currentItem"
    create-title="新增角色"
    edit-title="编辑角色"
    @cancel="onCancel"
    @ok="onOk"
  ></role-modal>
</template>

<script setup lang="ts">
import TableToolbar from '@/components/TabToolbar.vue';
import RoleModal from './RoleModal.vue';
import { rolesColumns } from '@/utils/table';
import { getRoles } from '@/api/permission';
const roleList = reactive<Role[]>([]);
const loading = ref<boolean>(false);
const tableRef = ref();
const tableSize = ref<TableSize>('default');
const expandedRowKeys = reactive<number[]>([]); // 展开行
// 弹窗
const showModal = ref<boolean>(false);
const action = ref<Action>('create');
const currentItem = ref<Role | null>(null);

const getRoleList = async () => {
  loading.value = true;

  try {
    const res = await getRoles();
    roleList.splice(0, roleList.length, ...res.list);
  } catch (error) {
    roleList.splice(0, roleList.length);
    return Promise.reject(error);
  } finally {
    loading.value = false;
  }
};
const setRowKey = (record: Role) => record.id;

// 刷新
const onRefresh = () => {
  getRoleList();
};
// 展开行
const onExpand = (expanded: boolean, record: Role) => {
  if (expanded) {
    expandedRowKeys.push(record.id);
  } else {
    const index = expandedRowKeys.findIndex((id: number) => id === record.id);
    expandedRowKeys.splice(index, 1);
  }
};
// 新增
const onCreate = () => {
  action.value = 'create';
  showModal.value = true;
};
// 编辑
const onEdit = (record: Role) => {
  action.value = 'edit';
  currentItem.value = record;
  showModal.value = true;
};
const onCancel = () => {
  showModal.value = false;
};
const onOk = () => {
  showModal.value = false;
  getRoleList();
};
// 删除
const onRemove = (record: TableListItem) => {
  loading.value = true;
  // TODO 删除接口
  setTimeout(() => {
    loading.value = false;
    getRoleList();
  }, 1000);
};

getRoleList();
</script>

<style scoped></style>
