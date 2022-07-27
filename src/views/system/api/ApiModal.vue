<template>
  <template>
    <a-modal
      :visible="visible"
      :title="title"
      :confirm-loading="confirmLoading"
      :mask-closable="false"
      @cancel="onCancel"
      @ok="onOk"
    >
      <a-form v-bind="formItemLayout">
        <a-form-item label="API路径" v-bind="validateInfos.path">
          <a-input v-model:value="formState.path" />
        </a-form-item>
        <a-form-item label="method" v-bind="validateInfos.method">
          <a-select v-model:value="formState.method" :options="methodOptions"> </a-select>
        </a-form-item>
        <a-form-item label="描述" v-bind="validateInfos.desc">
          <a-input v-model:value="formState.desc" />
        </a-form-item>
        <a-form-item label="API分组">
          <a-input v-model:value="formState.group" />
        </a-form-item>
      </a-form>
    </a-modal>
  </template>
</template>

<script setup lang="ts">
import { formItemLayout, methodOptions } from './data';
import { useApiForm } from './useApiForm';

interface Props {
  visible: boolean;
  action: Action;
  data?: Api | null;
}
interface Emits {
  (event: 'update:visible', value: boolean): void;
  (event: 'update'): void; // 通知父组件更新数据
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const title = computed(() => {
  return props.action === 'create' ? '新增API' : '编辑API';
});
const confirmLoading = ref<boolean>(false);

const { formState, validateInfos, validate, resetFields, dataToFormState } = useApiForm();

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      // 编辑，设置表单
      if (props.action === 'edit' && props.data) {
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

<style scoped></style>
