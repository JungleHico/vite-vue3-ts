<template>
  <div class="table-toolbar">
    <div class="table-toolbar-title">{{ title }}</div>
    <div class="table-toolbar-settings">
      <slot name="toolbar"></slot>
      <template v-if="showTableSetting">
        <a-tooltip class="table-toolbar-setting-item" title="刷新">
          <reload-outlined @click="onRefresh"></reload-outlined>
        </a-tooltip>
        <a-tooltip class="table-toolbar-setting-item" title="密度">
          <a-dropdown>
            <column-height-outlined></column-height-outlined>
            <template #overlay>
              <a-menu v-model:selectedKeys="tableSizeMenuKeys" @click="onChangeTableSize">
                <a-menu-item key="default">默认</a-menu-item>
                <a-menu-item key="middle">中等</a-menu-item>
                <a-menu-item key="small">紧凑</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-tooltip>
        <a-tooltip class="table-toolbar-setting-item" title="全屏">
          <fullscreen-exit-outlined
            v-if="ifFullscreen"
            @click="onFullscreen"
          ></fullscreen-exit-outlined>
          <fullscreen-outlined v-else @click="onFullscreen"></fullscreen-outlined>
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
  FullscreenExitOutlined,
} from '@ant-design/icons-vue';

interface Props {
  title?: string;
  showTableSetting?: boolean;
  size?: TableSize;
  tableRef: Element;
}
interface Emits {
  (event: 'refresh'): void;
  (event: 'update:size', value: TableSize): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const slots = useSlots();

// 刷新
const onRefresh = () => {
  emits('refresh');
};

// 密度
const tableSizeMenuKeys = computed(() => [props.size]);
const onChangeTableSize = (e: any) => {
  emits('update:size', e.key);
};

// 全屏
const ifFullscreen = ref<boolean>(false);
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
.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .table-toolbar-title {
    font-size: 16px;
  }
  .table-toolbar-setting-item {
    margin-left: 16px;
    font-size: 16px;
  }
}
</style>
