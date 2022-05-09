<template>
  <a-modal :visible="visible" :title="title" @ok="onOk">
    <a-form layout="vertical">
      <a-form-item v-if="action === 'edit'" label="ID">
        <a-input v-model:value="modelRef.id" disabled />
      </a-form-item>
      <a-form-item label="角色名称" v-bind="validateInfos.name">
        <a-input v-model:value="modelRef.name" />
      </a-form-item>
      <a-form-item label="描述">
        <a-input v-model:value="modelRef.desc" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { Form } from 'ant-design-vue';

type Props = {
  visible: boolean;
  action: Action;
  data?: Role | null;
};
type Emits = {
  (event: 'update:visible', value: boolean): void;
  (event: 'ok'): void;
};
type FormState = {
  id?: number;
  name: string;
  desc: string;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

// 标题
const title = computed(() => {
  return props.action === 'create' ? '新增角色' : '编辑角色';
});
// 表单数据
const modelRef = reactive<FormState>({
  name: '',
  desc: ''
});
// 表单校验规则
const rulesRef = reactive({
  name: [
    {
      required: true,
      message: '请输入角色名称'
    }
  ]
});
const useForm = Form.useForm;
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);

watch(
  () => props.visible,
  async (visible: boolean) => {
    if (visible) {
      // 编辑，初始化表单
      if (props.action === 'edit' && props.data) {
        modelRef.id = props.data.id;
        modelRef.name = props.data.name;
        modelRef.desc = props.data.desc;
      }
    } else {
      // 关闭弹窗，重置表单
      resetFields();
    }
  }
);

const onOk = () => {
  validate().then(() => {
    console.log(toRaw(modelRef));
    if (props.action === 'create') {
      // TODO 新增权限
    } else {
      // TODO 更新数据
    }
    emits('ok');
  });
};
</script>

<style scoped></style>
