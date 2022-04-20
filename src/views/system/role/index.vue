<template>
  <div class="table-wrapper" ref="tableRef">
    <a-table
      :columns="rolesColumns"
      :data-source="roleList"
      :loading="loading"
      :pagination="pagination"
      :size="tableSize"
      @change="onTableChange"
    >
      <template #title>
        <table-toolbar
          title="角色管理"
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
            <a @click="onSetAuthority(record.id)"
              ><setting-outlined></setting-outlined>设置权限</a
            >
            <a @click="onEdit(record)"><edit-outlined></edit-outlined>编辑</a>
            <a-popconfirm
              title="确定删除当前内容吗？"
              ok-text="删除"
              cancel-text="取消"
              :ok-button-props="{ danger: true }"
              @confirm="onRemove(record)"
            >
              <a><delete-outlined></delete-outlined>删除</a>
            </a-popconfirm>
          </a-space>
        </template>
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

  <authority-modal
    v-model:visible="showAuthorityModal"
    :role-id="currentRoleId"
    @cancel="onAuthorityModalCancel"
    @ok="onAuthorityModalOk"
  ></authority-modal>
</template>

<script setup lang="ts">
import TableToolbar from '@/components/TabToolbar.vue';
import RoleModal from './RoleModal.vue';
import AuthorityModal from './AuthorityModal/index.vue';
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue';
import { rolesColumns } from '@/utils/table';
import { getRoles } from '@/api/permission';

const roleList = ref<Role[]>([]);
const loading = ref<boolean>(false);
const tableRef = ref();
const tableSize = ref<TableSize>('default');
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});
// 角色弹窗
const showModal = ref<boolean>(false);
const action = ref<Action>('create');
const currentItem = ref<Role | null>(null);
// 权限弹窗
const showAuthorityModal = ref<boolean>(false);
const currentRoleId = ref<number>(0);

const getRoleList = async () => {
  loading.value = true;
  const params = {
    current: pagination.current,
    pageSize: pagination.pageSize
  };

  try {
    const { list, total } = await getRoles(params);
    roleList.value = list;
    pagination.total = total;
  } catch (error) {
    roleList.value = [];
    return Promise.reject(error);
  } finally {
    loading.value = false;
  }
};

// 刷新
const onRefresh = () => {
  getRoleList();
};
// 翻页，改变分页大小
const onTableChange = ({ current, pageSize }: Pagination) => {
  pagination.current = current;
  pagination.pageSize = pageSize;
  getRoleList();
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
const onRemove = (record: Role) => {
  loading.value = true;
  // TODO 删除接口
  setTimeout(() => {
    loading.value = false;
    getRoleList();
  }, 1000);
};

// 设置权限
const onSetAuthority = (roleId: number) => {
  currentRoleId.value = roleId;
  showAuthorityModal.value = true;
};
// 关闭权限弹窗
const onAuthorityModalCancel = () => {
  showAuthorityModal.value = false;
};
const onAuthorityModalOk = () => {
  showAuthorityModal.value = false;
  window.location.reload();
};

getRoleList();
</script>

<style scoped></style>
