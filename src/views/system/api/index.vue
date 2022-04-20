<template>
  <div class="table-wrapper" ref="tableRef">
    <a-table
      :columns="apiColumns"
      :data-source="apiList"
      :loading="loading"
      :pagination="pagination"
      :size="tableSize"
      :row-key="setRowKey"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      @change="onTableChange"
    >
      <template #title>
        <table-toolbar
          title="API管理"
          v-model:size="tableSize"
          create-button-text="新增"
          :table-ref="tableRef"
          @create="onCreate"
          @refresh="onRefresh"
        >
        </table-toolbar>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space size="middle">
            <a @click="onEdit(record)"><edit-outlined></edit-outlined>编辑</a>
            <a @click="onRemove(record)"
              ><delete-outlined></delete-outlined>删除</a
            >
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <api-modal
    v-model:visible="showModal"
    :action="action"
    :data="currentItem"
    @cancel="onCancel"
    @ok="onOk"
  ></api-modal>
</template>

<script setup lang="ts">
import TableToolbar from '@/components/TabToolbar.vue';
import ApiModal from './ApiModal.vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { apiColumns } from '@/utils/table';
import { getApis } from '@/api/permission';
import ConfirmModal from '@/plugins/ConfirmModal';

const apiList = ref<Api[]>([]);
const loading = ref<boolean>(false);
const tableRef = ref();
const tableSize = ref<TableSize>('default');
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});
const selectedRowKeys = ref<number[]>([]); // 勾选的行
// 弹窗
const showModal = ref<boolean>(false);
const action = ref<Action>('create');
const currentItem = ref<Api | null>(null);

const getApiList = async () => {
  loading.value = true;
  const params = {
    current: pagination.current,
    pageSize: pagination.pageSize
  };

  try {
    const { list, total } = await getApis(params);
    apiList.value = list;
    pagination.total = total;
  } catch (error) {
    apiList.value = [];
    return Promise.reject(error);
  } finally {
    loading.value = false;
  }
};
const setRowKey = (record: Api) => {
  return record.id;
};

// 刷新
const onRefresh = () => {
  getApiList();
};
// 翻页，改变分页大小
const onTableChange = ({ current, pageSize }: Pagination) => {
  pagination.current = current;
  pagination.pageSize = pageSize;
  getApiList();
};
// 新增
const onCreate = () => {
  action.value = 'create';
  currentItem.value = null;
  showModal.value = true;
};
// 编辑
const onEdit = (record: Api) => {
  action.value = 'edit';
  currentItem.value = record;
  showModal.value = true;
};
const onCancel = () => {
  showModal.value = false;
};
const onOk = () => {
  showModal.value = false;
  getApiList();
};
// 勾选
const onSelectChange = (keys: number[]) => {
  selectedRowKeys.value = keys;
};
// 删除
const onRemove = (record: Api) => {
  const title = selectedRowKeys.value.includes(record.id)
    ? `确定删除选中的【${selectedRowKeys.value.length}项】API吗？`
    : '确定删除当前API吗？';
  ConfirmModal.error({
    title,
    onOk: async () => {
      // TODO 删除接口

      // 模拟接口
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      getApiList();
    }
  });
};

getApiList();
</script>

<style scoped></style>
