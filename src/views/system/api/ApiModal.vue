<template>
  <a-modal :visible="visible" :title="title" :mask-closable="false" @ok="onOk">
    <a-form v-bind="formItemLayout">
      <a-form-item v-if="action === 'edit'" label="ID">
        <a-input v-model:value="modelRef.id" disabled />
      </a-form-item>
      <a-form-item label="API路径" v-bind="validateInfos.path">
        <a-input v-model:value="modelRef.path" />
      </a-form-item>
      <a-form-item label="方法" v-bind="validateInfos.method">
        <a-select v-model:value="modelRef.method" :options="methodOptions">
        </a-select>
      </a-form-item>
      <a-form-item label="描述" v-bind="validateInfos.desc">
        <a-input v-model:value="modelRef.desc" />
      </a-form-item>
      <a-form-item label="API分组">
        <a-input v-model:value="modelRef.group" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { Form } from 'ant-design-vue';

type Props = {
  visible: boolean;
  action: Action;
  data?: Api | null;
};
type FormState = {
  id?: number;
  path: string;
  desc: string;
  method: string;
  group: string;
};
type Emits = {
  (event: 'ok'): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

// 标题
const title = computed(() => {
  return props.action === 'create' ? '新增API' : '编辑API';
});
// 表单布局
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
// 表单数据
const modelRef = reactive<FormState>({
  path: '',
  desc: '',
  method: '',
  group: ''
});
// 表单验证规则
const rulesRef = reactive({
  path: [{ required: true, message: '请输入API路径' }],
  desc: [{ required: true, message: '请输入API描述' }],
  method: [{ required: true, message: '请选择方法' }]
});
const { resetFields, validate, validateInfos } = Form.useForm(
  modelRef,
  rulesRef
);
const methodOptions = [
  { value: 'get' },
  { value: 'post' },
  { value: 'put' },
  { value: 'delete' }
];

watch(
  () => props.visible,
  async (visible: boolean) => {
    if (visible) {
      if (props.action === 'edit' && props.data) {
        modelRef.id = props.data.id;
        modelRef.path = props.data.path;
        modelRef.method = props.data.method;
        modelRef.desc = props.data.desc;
        modelRef.group = props.data.group;
      }
    } else {
      resetFields();
    }
  }
);

const onOk = () => {
  validate().then(() => {
    console.log(toRaw(modelRef));
    if (props.action === 'create') {
      // TODO 新增接口
    } else {
      // TODO 更新接口
    }
    emits('ok');
  });
};
</script>

<style scoped></style>
