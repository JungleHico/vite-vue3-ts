<template>
  <div>
    <custom-table
      table-title="菜单管理"
      :columns="columns"
      :data-source="menuList"
      :loading="loading"
      :scroll="{ x: 1300 }"
      size="middle"
      show-table-setting
      :row-key="setRowKey"
      @refresh="getList"
    >
      <template #toolbar>
        <a-button type="primary" @click="onCreateRootMenu">
          <template #icon>
            <plus-outlined></plus-outlined>
          </template>
          新增根菜单
        </a-button>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'title'">
          {{ record.meta.title || '' }}
        </template>
        <template v-else-if="column.dataIndex === 'icon'">
          <a-space v-if="record.meta.icon && record.meta.icon !== ''">
            <ant-icon :icon="record.meta.icon" />{{ record.meta.icon }}
          </a-space>
        </template>
        <template v-else-if="column.dataIndex === 'keepAlive'">
          {{ record.meta.keepAlive ? '是' : '否' }}
        </template>
        <template v-else-if="column.dataIndex === 'hidden'">
          {{ record.meta.hidden ? '是' : '否' }}
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space size="middle">
            <a @click="onCreateSubMenu(record)"><plus-outlined></plus-outlined>新增子菜单</a>
            <a @click="onEdit(record)"><edit-outlined></edit-outlined>编辑</a>
            <a @click="onRemove(record)"><delete-outlined></delete-outlined>删除</a>
          </a-space>
        </template>
      </template>
    </custom-table>

    <menu-modal
      v-model:visible="showModal"
      :action="action"
      :data="currentMenuItem"
      :menu-list="menuList"
      @update="getList"
    ></menu-modal>
  </div>
</template>

<script setup lang="ts" name="Menu">
import CustomTable from '@/components/customTable/index.vue';
import MenuModal from './MenuModal.vue';
import AntIcon from '@/components/AntIcon.vue';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { columns } from './data';
import { getMenuList } from '@/api/system';
import ConfirmModal from '@/plugins/ConfirmModal';

const menuList = ref<MenuListItem[]>([]);
const loading = ref<boolean>(false);
const showModal = ref<boolean>(false);
const action = ref<Action>('create');
const currentMenuItem = ref<MenuListItem | null>(null);

const getList = async () => {
  loading.value = true;

  try {
    const data = await getMenuList();
    menuList.value = data;
  } catch (error) {
    menuList.value = [];
    return Promise.reject(error);
  } finally {
    loading.value = false;
  }
};

const setRowKey = (record: MenuListItem) => {
  return record.id;
};

// 新增根菜单
const onCreateRootMenu = () => {
  action.value = 'create';
  currentMenuItem.value = null;
  showModal.value = true;
};
// 新增子菜单
const onCreateSubMenu = (record: MenuListItem) => {
  action.value = 'create';
  currentMenuItem.value = record;
  showModal.value = true;
};
// 编辑菜单
const onEdit = (record: MenuListItem) => {
  action.value = 'edit';
  currentMenuItem.value = record;
  showModal.value = true;
};

// 删除
const onRemove = (record: TableListItem) => {
  ConfirmModal.error({
    title: '确定删除当前菜单及子菜单吗？',
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
