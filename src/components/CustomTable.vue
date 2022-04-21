<template>
  <a-table v-bind="$attrs" :size="size">
    <template #title>
      <table-toolbar
        :title="toolbarTitle"
        :create-button="createButton"
        :create-button-text="createButtonText"
        :refresh="refresh"
        v-model:size="size"
        :fullscreen="fullscreen"
        :table-ref="tableContainer"
        @create="onCreate"
        @refresh="onRefresh"
      >
      </table-toolbar>
    </template>

    <template #bodyCell="{ column, index, text, record }">
      <slot
        name="bodyCell"
        :column="column"
        :index="index"
        :text="text"
        :record="record"
      ></slot>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import TableToolbar from '@/components/TabToolbar.vue';

type Props = {
  toolbarTitle?: string; // 表头标题
  createButton?: boolean; // 是否显示新建按钮
  createButtonText?: string; // 新建按钮文本
  refresh?: boolean; // 是否显示刷新图标
  tableSize?: boolean; // 是否显示表格密度图标
  fullscreen?: boolean; // 是否显示全屏图标
  tableContainer?: Element | undefined; // 表格DOM元素，用于全屏
};
type Emits = {
  (event: 'create'): void; // 点击新增按钮触发
  (event: 'refresh'): void; // 刷新触发
};

const props = withDefaults(defineProps<Props>(), {
  toolbarTitle: '',
  createButton: true,
  createButtonText: '新建',
  refresh: true,
  tableSize: true,
  fullscreen: true,
  tableContainer: undefined
});
const emits = defineEmits<Emits>();

const size = ref<TableSize>('default');

const onCreate = () => {
  emits('create');
};
const onRefresh = () => {
  emits('refresh');
};
</script>

<style scoped></style>
