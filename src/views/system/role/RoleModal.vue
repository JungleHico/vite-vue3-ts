<template>
  <a-modal
    :visible="visible"
    :title="title"
    :confirm-loading="confirmLoading"
    :mask-closable="false"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-form layout="vertical">
      <a-form-item v-if="action === 'edit'" label="ID">
        <a-input v-model:value="formState.id" disabled />
      </a-form-item>
      <a-form-item label="角色值" v-bind="validateInfos.value">
        <a-input v-model:value="formState.value" />
      </a-form-item>
      <a-form-item label="角色名称" v-bind="validateInfos.name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="备注">
        <a-input v-model:value="formState.remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { Form } from 'ant-design-vue';

interface Props {
  visible: boolean;
  action: Action;
  data?: Role | null;
}
interface Emits {
  (event: 'update:visible', value: boolean): void;
  (event: 'update'): void; // 通知父组件更新数据
}
interface FormState {
  id?: number;
  value: string;
  name: string;
  remark: string;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const title = computed(() => {
  return props.action === 'create' ? '新增角色' : '编辑角色';
});
const confirmLoading = ref<boolean>(false);

const formState = reactive<FormState>({
  value: '',
  name: '',
  remark: '',
});
const rules = reactive({
  value: [{ required: true, message: '请输入角色值' }],
  name: [{ required: true, message: '请输入角色名称' }],
});
const useForm = Form.useForm;
const { validateInfos, validate, resetFields } = useForm(formState, rules);

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      // 编辑，设置表单
      if (props.action === 'edit' && props.data) {
        formState.id = props.data.id;
        formState.value = props.data.value;
        formState.name = props.data.name;
        formState.remark = props.data.remark;
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
