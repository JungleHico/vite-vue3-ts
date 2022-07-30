<template>
  <div>
    <custom-table
      table-title="API管理"
      :columns="columns"
      :data-source="apiList"
      :loading="loading"
      :pagination="pagination"
      show-table-setting
      @change="onTableChange"
      @refresh="getList"
    >
      <template #toolbar>
        <a-button type="primary" @click="onCreate">
          <template #icon>
            <plus-outlined></plus-outlined>
          </template>
          新增API
        </a-button>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space size="middle">
            <a @click="onEdit(record)"><edit-outlined></edit-outlined>编辑</a>
            <a @click="onRemove(record)"><delete-outlined></delete-outlined>删除</a>
          </a-space>
        </template>
      </template>
    </custom-table>

    <api-modal
      v-model:visible="showModal"
      :action="action"
      :data="currentApi"
      @update="getList"
    ></api-modal>
  </div>
</template>

<script setup lang="ts" name="Api">
import CustomTable from '@/components/customTable/index.vue';
import ApiModal from './ApiModal.vue';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { columns } from './data';
import { getApiList } from '@/api/system';
import ConfirmModal from '@/plugins/ConfirmModal';

const apiList = ref<Api[]>([]);
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0,
});
const loading = ref<boolean>(false);
const showModal = ref<boolean>(false);
const action = ref<Action>('create');
const currentApi = ref<Api | null>(null);

const getList = async () => {
  const params = {
    current: pagination.current,
    pageSize: pagination.pageSize,
  };
  loading.value = true;

  try {
    const { list, total } = await getApiList(params);
    apiList.value = list;
    pagination.total = total;
  } catch (error) {
    apiList.value = [];
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

// 新增
const onCreate = () => {
  action.value = 'create';
  showModal.value = true;
};

// 编辑
const onEdit = (record: Api) => {
  action.value = 'edit';
  currentApi.value = record;
  showModal.value = true;
};

// 删除
const onRemove = (record: Api) => {
  ConfirmModal.error({
    title: '确定删除当前API吗？',
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

<style scoped></style>
