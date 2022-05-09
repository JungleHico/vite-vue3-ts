<template>
  <div class="table-wrapper" ref="tableContainer">
    <custom-table
      :columns="columns"
      :data-source="tableList"
      :pagination="pagination"
      toolbar-title="查询表格"
      :table-container="tableContainer"
      :row-key="setRowKey"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      @create="onCreate"
      @refresh="onRefresh"
      @change="onTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-badge
            :status="getStatus(text).status"
            :text="getStatus(text).text"
          />
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space size="middle">
            <a @click="onEdit(record)"><edit-outlined></edit-outlined>编辑</a>
            <a @click="onRemove(record)"
              ><delete-outlined></delete-outlined>删除</a
            >
          </a-space>
        </template>
      </template>
    </custom-table>
  </div>

  <table-list-modal
    v-model:visible="showModal"
    :mask-closable="false"
    :action="action"
    :data="currentItem"
    @cancel="onCancel"
    @ok="onOk"
  ></table-list-modal>
</template>

<script setup lang="ts">
import CustomTable from '@/components/CustomTable.vue';
import TableListModal from './TableListModal.vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { columns } from '@/utils/table';
import { getTableList } from '@/api/tableList';
import ConfirmModal from '@/plugins/ConfirmModal';

const tableContainer = ref();
const tableList = ref<TableListItem[]>([]);
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});
const tableSize = ref<TableSize>('default');
const selectedRowKeys = ref<number[]>([]); // 勾选的行
// 弹窗
const showModal = ref<boolean>(false);
const action = ref<Action>('create');
const currentItem = ref<TableListItem | null>(null);

// methods
const getList = async () => {
  const params = {
    current: pagination.current,
    pageSize: pagination.pageSize
  };

  try {
    const { list, total } = await getTableList(params);
    tableList.value = list;
    pagination.total = total;
  } catch (error) {
    tableList.value = [];
    return Promise.reject(error);
  }
};
// 获取状态
const getStatus = (status: number) => {
  const statusList = [
    { status: 'default', text: '关闭' },
    { status: 'success', text: '开启' }
  ];
  return statusList[status];
};
const setRowKey = (record: Api) => {
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
      // TODO 删除接口

      // 模拟接口
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      getList();
    }
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
