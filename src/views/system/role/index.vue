<template>
  <div>
    <custom-table
      table-title="角色管理"
      :columns="columns"
      :data-source="roleList"
      :loading="loading"
      :scroll="{ x: 850 }"
      show-table-setting
      @refresh="getList"
    >
      <template #toolbar>
        <a-button type="primary" @click="onCreate">
          <template #icon>
            <plus-outlined></plus-outlined>
          </template>
          新增角色
        </a-button>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space size="middle">
            <a @click="onSetAuthority(record)"><setting-outlined></setting-outlined>设置权限</a>
            <a @click="onEdit(record)"><edit-outlined></edit-outlined>编辑</a>
            <a @click="onRemove(record)"><delete-outlined></delete-outlined>删除</a>
          </a-space>
        </template>
      </template>
    </custom-table>

    <role-modal
      v-model:visible="showRoleModal"
      :action="action"
      :data="currentRole"
      @update="getList"
    ></role-modal>

    <authority-modal v-model:visible="showAuthorityModal"></authority-modal>
  </div>
</template>

<script setup lang="ts" name="Role">
import CustomTable from '@/components/customTable/index.vue';
import RoleModal from './RoleModal.vue';
import AuthorityModal from './authorityModal/index.vue';
import { PlusOutlined, SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { columns } from './data';
import { useRoleList } from './useRoleList';
import { useRoleModal } from './useRoleModal';
import { useAuthorityModal } from './useAuthorityModal';

// 角色列表
const { roleList, loading, getList, onRemove } = useRoleList();

// 角色弹窗
const { showRoleModal, action, currentRole, onCreate, onEdit } = useRoleModal();

// 权限弹窗
const { showAuthorityModal, onSetAuthority } = useAuthorityModal();

getList();
</script>

<style scoped></style>
