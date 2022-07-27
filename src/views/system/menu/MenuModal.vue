<template>
  <a-modal
    :visible="visible"
    :title="title"
    :mask-closable="false"
    :confirm-loading="confirmLoading"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-form v-bind="formItemLayout">
      <a-form-item label="父级菜单">
        <a-tree-select
          v-model:value="formState.parentId"
          :tree-data="menuTree"
          :field-names="menuTreeFieldNames"
          placeholder="不填表示根菜单"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="路由Name" v-bind="validateInfos.name">
        <a-input v-model:value="formState.name" placeholder="唯一英文字符串，与组件名称保持一致" />
      </a-form-item>
      <a-form-item label="路由地址" v-bind="validateInfos.path">
        <a-input v-model:value="formState.path" />
      </a-form-item>
      <a-form-item label="菜单标题" v-bind="validateInfos.title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="菜单图标">
        <a-auto-complete
          v-model:value="formState.icon"
          :options="iconOptions"
          :filter-option="iconFilterOption"
        >
          <template #option="{ value }">
            <a-space>
              <ant-icon :icon="value"></ant-icon>
              <span>{{ value }}</span>
            </a-space>
          </template>
        </a-auto-complete>
      </a-form-item>
      <a-form-item label="组件路径" v-bind="validateInfos.component">
        <a-input v-model:value="formState.component" placeholder="例如：views/xxx.vue" />
      </a-form-item>
      <a-form-item label="排序值">
        <a-input-number
          v-model:value="formState.sort"
          class="input-number"
          :min="0"
          :max="1000"
          :formatter="integerFormatter"
          placeholder="非负整数，数值越大位置越靠前"
        />
      </a-form-item>
      <a-form-item label="是否缓存页面">
        <a-select v-model:value="formState.keepAlive">
          <a-select-option :value="1">是</a-select-option>
          <a-select-option :value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否隐藏菜单">
        <a-select v-model:value="formState.hidden">
          <a-select-option :value="1">是</a-select-option>
          <a-select-option :value="0">否</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import AntIcon from '@/components/AntIcon.vue';
import { formItemLayout, iconOptions, iconFilterOption, menuTreeFieldNames } from './data';
import { useMenuForm } from './useMenuForm';
import { integerFormatter } from '@/utils/form';

interface Props {
  visible: boolean;
  action: Action;
  data?: MenuListItem | null;
  menuList: MenuListItem[];
}
interface Emits {
  (event: 'update:visible', value: boolean): void;
  (event: 'update'): void; // 通知父组件更新数据
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const title = computed(() => {
  return props.action === 'create' ? '新增菜单' : '编辑菜单';
});
const menuTree = computed(() => getFormattedTreeData(props.menuList));
const confirmLoading = ref<boolean>(false);

const { formState, validateInfos, validate, resetFields, getFormattedTreeData, dataToFormState } =
  useMenuForm();

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      if (props.action === 'create') {
        if (props.data) {
          // 新增子菜单
          formState.parentId = props.data.id;
        }
      } else if (props.data) {
        // 编辑，设置表单
        dataToFormState(props.data, formState);
      }
    } else {
      // 关闭弹窗时重置表单
      resetFields();
    }
  },
);

const onCancel = () => {
  emits('update:visible', false);
};

const onOk = async () => {
  try {
    await validate();
    console.log(toRaw(formState));
    confirmLoading.value = true;
    if (props.action === 'create') {
      // TODO 新增接口
    } else {
      // TODO 编辑接口
    }
    // 模拟接口
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    emits('update:visible', false);
    emits('update');
  } catch (error) {
    console.log('error', error);
  } finally {
    confirmLoading.value = false;
  }
};
</script>

<style scoped>
.input-number {
  width: 100%;
}
</style>
