<template>
  <div class="table-wrapper" ref="tableContainer">
    <custom-table
      :columns="apiColumns"
      :data-source="apiList"
      :pagination="pagination"
      toolbar-title="API管理"
      create-button-text="新增API"
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
        <template v-if="column.dataIndex === 'action'">
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

  <api-modal
    v-model:visible="showModal"
    :action="action"
    :data="currentItem"
    @cancel="onCancel"
    @ok="onOk"
  ></api-modal>
</template>

<script setup lang="ts">
import CustomTable from '@/components/CustomTable.vue';
import ApiModal from './ApiModal.vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { apiColumns } from '@/utils/table';
import { getApis } from '@/api/permission';
import ConfirmModal from '@/plugins/ConfirmModal';

const apiList = ref<Api[]>([]);
const tableContainer = ref();
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
const onTableChange = ({ current, pageSize }: any) => {
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
