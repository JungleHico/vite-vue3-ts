<template>
  <div class="table-toolbar-wrapper">
    <slot name="title">
      <div class="table-toolbar-title">
        {{ title }}
      </div>
    </slot>
    <div class="table-toolbar-right">
      <template v-if="createButton">
        <a-button type="primary" @click="onCreate">
          <template #icon>
            <ant-icon icon="PlusOutlined"></ant-icon>
          </template>
          {{ createButtonText }}
        </a-button>
      </template>
      <template v-if="refresh">
        <a-tooltip class="table-toolbar-setting-item" title="刷新">
          <reload-outlined @click="onRefresh"></reload-outlined>
        </a-tooltip>
      </template>
      <template v-if="tableSize">
        <a-tooltip class="table-toolbar-setting-item" title="密度">
          <a-dropdown>
            <column-height-outlined></column-height-outlined>
            <template #overlay>
              <a-menu
                v-model:selectedKeys="tableSizeMenuKeys"
                @click="onChangeTableSize"
              >
                <a-menu-item key="default">默认</a-menu-item>
                <a-menu-item key="middle">中等</a-menu-item>
                <a-menu-item key="small">紧凑</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-tooltip>
      </template>
      <template v-if="fullscreen">
        <a-tooltip class="table-toolbar-setting-item" title="全屏">
          <fullscreen-exit-outlined
            v-if="ifFullscreen"
            @click="onFullscreen"
          ></fullscreen-exit-outlined>
          <fullscreen-outlined
            v-else
            @click="onFullscreen"
          ></fullscreen-outlined>
        </a-tooltip>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ReloadOutlined,
  ColumnHeightOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue';

type TableSize = 'default' | 'middle' | 'small';
type Props = {
  title?: string;
  createButton?: boolean;
  createButtonText?: string;
  refresh?: boolean;
  tableSize?: boolean;
  size?: TableSize;
  fullscreen?: boolean;
  tableRef?: Element;
};
type Emits = {
  (event: 'create'): void;
  (event: 'refresh'): void;
  (event: 'update:size', value: TableSize): void;
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  createButton: true,
  createButtonText: '新建',
  refresh: true,
  tableSize: true,
  size: 'default',
  fullscreen: true
});
const emits = defineEmits<Emits>();

// 密度菜单高亮
const tableSizeMenuKeys = computed(() => [props.size]);
// 是否全屏
const ifFullscreen = ref<boolean>(false);

// 新建
const onCreate = () => {
  emits('create');
};
// 刷新
const onRefresh = () => {
  emits('refresh');
};
// 密度
const onChangeTableSize = (e: any) => {
  emits('update:size', e.key);
};
// 全屏
const onFullscreen = () => {
  if (props.tableRef) {
    if (ifFullscreen.value) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      if (props.tableRef.requestFullscreen) {
        props.tableRef.requestFullscreen();
      }
    }
  } else {
    console.warn('Fullscreen require props: tableRef');
  }
};
// 全屏/退出全屏事件监听
const setFullscreenListener = () => {
  nextTick(() => {
    if (props.tableRef) {
      props.tableRef.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
          ifFullscreen.value = true;
        } else {
          ifFullscreen.value = false;
        }
      });
    }
  });
};

setFullscreenListener();
</script>

<style scoped lang="less">
.table-toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .table-toolbar-title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
  }
  .table-toolbar-setting-item {
    margin-left: 16px;
  }
}
</style>
