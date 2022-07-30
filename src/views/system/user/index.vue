<template>
  <div>
    <custom-table
      table-title="用户管理"
      :columns="columns"
      :data-source="userList"
      :loading="loading"
      :pagination="pagination"
      :scroll="{ x: 850 }"
      show-table-setting
      @change="onTableChange"
      @refresh="getList"
    >
      <template #toolbar>
        <a-button type="primary" @click="onCreate">
          <template #icon>
            <plus-outlined></plus-outlined>
          </template>
          新增用户
        </a-button>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <img class="avatar" :src="text" alt="avatar" />
        </template>
        <template v-else-if="column.dataIndex === 'roles'">
          <a-tag v-for="role in text" :key="role" color="cyan">
            {{ role }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space size="middle">
            <a @click="onEdit(record)"><edit-outlined></edit-outlined>编辑</a>
            <a @click="onRemove(record)"><delete-outlined></delete-outlined>删除</a>
          </a-space>
        </template>
      </template>
    </custom-table>

    <user-modal
      v-model:visible="showModal"
      :action="action"
      :data="currentUser"
      @update="getList"
    ></user-modal>
  </div>
</template>

<script setup lang="ts" name="User">
import CustomTable from '@/components/customTable/index.vue';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import UserModal from './UserModal.vue';
import { columns } from './data';
import { getUserList } from '@/api/system';
import ConfirmModal from '@/plugins/ConfirmModal';

const userList = ref<User[]>([]);
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0,
});
const loading = ref<boolean>(false);
const showModal = ref<boolean>(false);
const action = ref<Action>('create');
const currentUser = ref<User | null>(null);

const getList = async () => {
  const params = {
    current: pagination.current,
    pageSize: pagination.pageSize,
  };
  loading.value = true;

  try {
    const { list, total } = await getUserList(params);
    userList.value = list;
    pagination.total = total;
  } catch (error) {
    userList.value = [];
    return Promise.reject(error);
  } finally {
    loading.value = false;
  }
};

// 翻页，改变分页大小
const onTableChange = ({ current, pageSize }: any) => {
  pagination.current = current;
  pagination.pageSize = pageSize;
  getList();
};

// 新增用户
const onCreate = () => {
  action.value = 'create';
  showModal.value = true;
};

// 编辑
const onEdit = (record: User) => {
  action.value = 'edit';
  currentUser.value = record;
  showModal.value = true;
};

// 删除
const onRemove = (record: TableListItem) => {
  ConfirmModal.error({
    title: '确定删除当前角色吗？',
    onOk: async () => {
      // 模拟接口
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      getList();
    },
  });
};

getList();
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  border-radius: 50%;
}
</style>
