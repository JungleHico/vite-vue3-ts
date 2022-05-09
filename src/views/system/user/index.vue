<template>
  <div class="table-wrapper" ref="tableContainer">
    <custom-table
      :columns="userColumns"
      :data-source="userList"
      :pagination="pagination"
      toolbar-title="用户管理"
      create-button-text="新增用户"
      :table-container="tableContainer"
      @create="onCreate"
      @refresh="onRefresh"
      @change="onTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <a-avatar :src="text" />
        </template>
        <template v-else-if="column.dataIndex === 'roles'">
          <a-tag v-for="role in text" :key="role" color="cyan">
            {{ role }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space size="middle">
            <a @click="onEdit(record)"><edit-outlined></edit-outlined>编辑</a>
            <a><delete-outlined></delete-outlined>删除</a>
          </a-space>
        </template>
      </template>
    </custom-table>
  </div>

  <user-modal
    v-model:visible="showModal"
    :action="action"
    :data="currentItem"
    @cancel="onCancel"
    @ok="onOk"
  ></user-modal>
</template>

<script setup lang="ts">
import CustomTable from '@/components/CustomTable.vue';
import UserModal from './UserModal.vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { userColumns } from '@/utils/table';
import { getUsers } from '@/api/permission';

const tableContainer = ref(); // 表格容器
const userList = ref<User[]>([]);
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});
// 弹窗
const showModal = ref<boolean>(false);
const action = ref<Action>('create');
const currentItem = ref<User | null>(null);

const getUserList = async () => {
  const params = {
    current: pagination.current,
    pageSize: pagination.pageSize
  };

  try {
    const { list, total } = await getUsers(params);
    userList.value = list;
    pagination.total = total;
  } catch (error) {
    userList.value = [];
    return Promise.reject(error);
  }
};

// 刷新
const onRefresh = () => {
  getUserList();
};
// 翻页，改变分页大小
const onTableChange = ({ current, pageSize }: any) => {
  pagination.current = current;
  pagination.pageSize = pageSize;
  getUserList();
};
// 新增
const onCreate = () => {
  action.value = 'create';
  currentItem.value = null;
  showModal.value = true;
};
// 编辑
const onEdit = (record: User) => {
  action.value = 'edit';
  currentItem.value = record;
  showModal.value = true;
};
const onCancel = () => {
  showModal.value = false;
};
const onOk = () => {
  showModal.value = false;
  getUserList();
};

getUserList();
</script>

<style scoped></style>
