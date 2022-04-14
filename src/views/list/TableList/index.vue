<template>
  <div class="table-wrapper" ref="tableRef">
    <a-table
      :columns="columns"
      :data-source="list"
      :pagination="pagination"
      :loading="loading"
      :size="tableSize"
      @change="onTableChange"
    >
      <template #title>
        <table-toolbar
          title="查询表格"
          v-model:size="tableSize"
          :table-ref="tableRef"
          @create="onCreate"
          @refresh="onRefresh"
        >
        </table-toolbar>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-badge
            :status="getStatus(text).status"
            :text="getStatus(text).text"
          />
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
import TableToolbar from '@/components/TabToolbar.vue';
import TableListModal from './TableListModal.vue';
import { columns } from '@/utils/table';
import { getTableList } from '@/api/tableList';

type Pagination = {
  current: number;
  pageSize: number;
  total: number;
};
type TableSize = 'default' | 'middle' | 'small';

const tableRef = ref();
const list = reactive<TableListItem[]>([]);
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
const currentItem = ref<TableListItem | null>(null);
// 气泡框
const showRemovePop = ref<boolean>(false);
const removeButtonProps = reactive({ danger: true, loading: false });

// methods
const getList = async () => {
  loading.value = true;
  const params = {
    current: pagination.current,
    pageSize: pagination.pageSize
  };

  try {
    const res = await getTableList(params);
    list.splice(0, list.length, ...res.list);
    pagination.total = res.total;
  } catch (error) {
    list.splice(0, list.length);
    return Promise.reject(error);
  } finally {
    loading.value = false;
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

// events
// 翻页，改变分页大小
const onTableChange = ({ current, pageSize }: Pagination) => {
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
// 删除
const onRemove = (record: TableListItem) => {
  loading.value = true;
  // TODO 删除接口
  setTimeout(() => {
    loading.value = false;
    getList();
  }, 1000);
};

getList();
</script>

<style scoped lang="less">
.table-wrapper {
  &:fullscreen {
    background-color: #fff;
  }
}
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
