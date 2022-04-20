<template>
  <div class="table-wrapper" ref="tableRef">
    <a-table
      :columns="menuColumns"
      :data-source="menuList"
      :loading="loading"
      :pagination="pagination"
      :size="tableSize"
      :row-key="setRowKey"
      :expanded-row-keys="expandedRowKeys"
      @expand="onExpand"
      @change="onTableChange"
    >
      <template #title>
        <table-toolbar
          title="菜单管理"
          v-model:size="tableSize"
          create-button-text="新增根菜单"
          :table-ref="tableRef"
          @create="onCreate"
          @refresh="onRefresh"
        ></table-toolbar>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'title'">
          {{ record.meta.title }}
        </template>
        <template v-else-if="column.dataIndex === 'icon'">
          <a-space v-if="record.meta.icon !== ''">
            <ant-icon :icon="record.meta.icon" />{{ record.meta.icon }}
          </a-space>
        </template>
        <template v-else-if="column.dataIndex === 'hidden'">
          <span>{{ text ? '隐藏' : '显示' }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space size="middle">
            <a @click="onCreateSubItem(record)"
              ><plus-outlined></plus-outlined>新增子菜单</a
            >
            <a @click="onEdit(record)"><edit-outlined></edit-outlined>编辑</a>
            <a-popconfirm
              title="确定删除当前菜单吗？"
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

  <menu-modal
    v-model:visible="showModal"
    :mask-closable="false"
    :action="action"
    :data="currentItem"
    :menu-list="menuList"
    @cancel="onCancel"
    @ok="onOk"
  ></menu-modal>
</template>

<script setup lang="ts">
import TableToolbar from '@/components/TabToolbar.vue';
import MenuModal from './MenuModal.vue';
import AntIcon from '@/components/AntIcon.vue';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue';
import { menuColumns } from '@/utils/table';
import { getMenu } from '@/api/permission';

const menuList = ref<MenuItem[]>([]);
const loading = ref<boolean>(false);
const tableRef = ref();
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});
const tableSize = ref<TableSize>('default');
const expandedRowKeys = reactive<number[]>([]); // 展开行
// 弹窗
const showModal = ref<boolean>(false);
const action = ref<Action>('create');
const currentItem = ref<MenuItem | null>(null);

const getMenuList = async () => {
  loading.value = true;
  const params = {
    current: pagination.current,
    pageSize: pagination.pageSize
  };

  try {
    const { list, total } = await getMenu(params);
    menuList.value = list;
    pagination.total = total;
  } catch (error) {
    menuList.value = [];
    return Promise.reject(error);
  } finally {
    loading.value = false;
  }
};
const setRowKey = (record: Role) => record.id;

// 刷新
const onRefresh = () => {
  getMenuList();
};
// 翻页，改变分页大小
const onTableChange = ({ current, pageSize }: Pagination) => {
  pagination.current = current;
  pagination.pageSize = pageSize;
  getMenuList();
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
  currentItem.value = null;
  showModal.value = true;
};
// 新增子菜单
const onCreateSubItem = (record: MenuItem) => {
  action.value = 'create';
  currentItem.value = record;
  showModal.value = true;
};
// 编辑
const onEdit = (record: MenuItem) => {
  action.value = 'edit';
  currentItem.value = record;
  showModal.value = true;
};
const onCancel = () => {
  showModal.value = false;
};
const onOk = () => {
  showModal.value = false;
  getMenuList();
};
// 删除
const onRemove = (record: MenuItem) => {
  loading.value = true;
  // TODO 删除接口
  setTimeout(() => {
    loading.value = false;
    getMenuList();
  }, 1000);
};

getMenuList();
</script>

<style scoped></style>
