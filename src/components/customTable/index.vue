<template>
  <div ref="tableRef" class="table-wrapper">
    <a-table v-bind="$attrs" :size="size" @change="onChange">
      <template #title>
        <table-toolbar
          :title="tableTitle"
          :show-table-setting="showTableSetting"
          v-model:size="size"
          :table-ref="tableRef"
          @refresh="onRefresh"
        >
          <template #toolbar v-if="$slots.toolbar">
            <slot name="toolbar"></slot>
          </template>
        </table-toolbar>
      </template>
      <template #bodyCell="data">
        <slot name="bodyCell" v-bind="data || {}"></slot>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import TableToolbar from './TableToolbar.vue';

interface Props {
  tableTitle?: string;
  showTableSetting?: boolean; // 是否显示右上角表格设置
}
interface Emits {
  (event: 'refresh'): void;
  (event: 'change', ...params: any): void;
}

// 分页、排序、筛选变化时触发
const onChange = (...params: any) => {
  emits('change', ...params);
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const attrs = useAttrs();

// 刷新
const onRefresh = () => {
  emits('refresh');
};

// 密度
const size = ref<TableSize>((attrs.size as TableSize) || 'default');

// 全屏
const tableRef = ref();
// const tableRef = ref<InstanceType<any>>();
</script>

<style scoped lang="less">
// 表格全屏样式
.table-wrapper {
  &:fullscreen {
    overflow: auto;
    background-color: #fff;
  }
}
</style>

<!-- <template>
  <div ref="tableRef" class="table-wrapper">
    <a-table v-bind="$attrs" :size="size">
      <template #title>
        <table-toolbar
          :title="toolbarTitle"
          :show-create-button="showCreateButton"
          :create-button-text="createButtonText"
          :show-refresh="showRefresh"
          :show-table-size="showTableSize"
          v-model:size="size"
          :fullscreen="fullscreen"
          :table-ref="tableRef"
          @create="onCreate"
          @refresh="onRefresh"
        >
        </table-toolbar>
      </template>

      <template #bodyCell="{ column, index, text, record }">
        <slot name="bodyCell" :column="column" :index="index" :text="text" :record="record"></slot>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import TableToolbar from './TableToolbar.vue';
import { Ref } from 'vue';

interface Props {
  toolbarTitle?: string; // 表头标题
  showCreateButton?: boolean; // 是否显示新建按钮
  createButtonText?: string; // 新建按钮文本
  showRefresh?: boolean; // 是否显示刷新图标
  showTableSize?: boolean; // 是否显示表格密度图标
  fullscreen?: boolean; // 是否显示全屏图标
}
interface Emits {
  (event: 'create'): void; // 点击新增按钮触发
  (event: 'refresh'): void; // 刷新触发
}
interface TableContainer {
  el: Element | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  toolbarTitle: '',
  showCreateButton: true,
  createButtonText: '新建',
  showRefresh: true,
  showTableSize: true,
  fullscreen: true,
});
const emits = defineEmits<Emits>();

const tableRef: Ref<any> = ref();
const size = ref<TableSize>('default');

const onCreate = () => {
  emits('create');
};
const onRefresh = () => {
  emits('refresh');
};
</script>

<style scoped lang="less">
// 表格全屏样式
.table-wrapper {
  &:fullscreen {
    overflow: auto;
    background-color: #fff;
  }
}
</style> -->
