<template>
  <div>
    <custom-table
      table-title="查询表格"
      :columns="columns"
      :data-source="tableList"
      :loading="loading"
      :pagination="pagination"
      :scroll="{ x: 850 }"
      show-table-setting
      :row-key="setRowKey"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      @refresh="onRefresh"
      @change="onTableChange"
    >
      <template #toolbar>
        <a-button type="primary" @click="onCreate">
          <template #icon>
            <plus-outlined></plus-outlined>
          </template>
          新增
        </a-button>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-badge :status="getStatus(text).status" :text="getStatus(text).text" />
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space size="middle">
            <a @click="onEdit(record)"><edit-outlined></edit-outlined>编辑</a>
            <a @click="onRemove(record)"><delete-outlined></delete-outlined>删除</a>
          </a-space>
        </template>
      </template>
    </custom-table>

    <table-list-modal
      v-model:visible="showModal"
      :mask-closable="false"
      :action="action"
      :data="currentItem"
      @cancel="onCancel"
      @ok="onOk"
    ></table-list-modal>
  </div>
</template>

<script setup lang="ts" name="TableList">
import CustomTable from '@/components/customTable/index.vue';
import TableListModal from './TableListModal.vue';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { columns } from './data';
import { getTableList } from '@/api/list';
import ConfirmModal from '@/plugins/ConfirmModal';

const tableList = ref<TableListItem[]>([]);
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0,
});
const loading = ref<boolean>(false);
const selectedRowKeys = ref<number[]>([]); // 勾选的行

// 弹窗
const showModal = ref<boolean>(false);
const action = ref<TableAction>('create');
const currentItem = ref<TableListItem | null>(null);

// 获取数据
const getList = async () => {
  const params = {
    current: pagination.current,
    pageSize: pagination.pageSize,
  };
  loading.value = true;
  selectedRowKeys.value = []; // 清空勾选项

  try {
    const { list, total } = await getTableList(params);
    tableList.value = list;
    pagination.total = total;
  } catch (error) {
    tableList.value = [];
    return Promise.reject(error);
  } finally {
    loading.value = false;
  }
};

// 获取状态
const getStatus = (status: number) => {
  const statusList = [
    { status: 'default', text: '关闭' },
    { status: 'success', text: '开启' },
  ];
  return statusList[status];
};
const setRowKey = (record: TableListItem) => {
  return record.id;
};

// events
// 翻页，改变分页大小
const onTableChange = ({ current, pageSize }: any) => {
  pagination.current = current;
  pagination.pageSize = pageSize;
  getList();
};
// 刷新
const onRefresh = () => {
  getList();
};
// 新建
const onCreate = () => {
  action.value = 'create';
  showModal.value = true;
};
// 编辑
const onEdit = (record: TableListItem) => {
  action.value = 'edit';
  currentItem.value = record;
  showModal.value = true;
};
const onCancel = () => {
  showModal.value = false;
};
const onOk = () => {
  showModal.value = false;
  getList();
};
// 勾选
const onSelectChange = (keys: number[]) => {
  selectedRowKeys.value = keys;
};
// 删除
const onRemove = (record: TableListItem) => {
  const title = selectedRowKeys.value.includes(record.id)
    ? `确定删除选中的【${selectedRowKeys.value.length}项】吗？`
    : '确定删除当前项吗？';
  ConfirmModal.error({
    title,
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

<style scoped lang="less">
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .table-settings {
    margin-left: 24px;
    font-size: 16px;
  }
}
</style>
