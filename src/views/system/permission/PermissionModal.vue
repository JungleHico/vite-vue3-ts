<template>
  <a-modal
    :visible="visible"
    :title="title"
    :confirm-loading="loading"
    @ok="onOk"
  >
    <a-form v-bind="formItemLayout">
      <a-form-item v-if="action === 'edit'" label="ID">
        <a-input v-model:value="modelRef.id" disabled />
      </a-form-item>
      <a-form-item label="权限标识" v-bind="validateInfos.key">
        <a-input v-model:value="modelRef.key" />
      </a-form-item>
      <a-form-item label="权限名称" v-bind="validateInfos.name">
        <a-input v-model:value="modelRef.name" />
      </a-form-item>
      <a-form-item label="操作类型">
        <a-select
          v-model:value="modelRef.actions"
          mode="multiple"
          :options="actions"
        ></a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { Form } from 'ant-design-vue';

type Props = {
  visible: boolean;
  action: Action;
  data?: Permission | null;
  createTitle?: string;
  editTitle?: string;
};
type Emits = {
  (event: 'update:visible', value: boolean): void;
  (event: 'ok'): void;
};
type FormState = {
  id?: number;
  key: string;
  name: string;
  actions: string[];
};

const props = withDefaults(defineProps<Props>(), {
  createTitle: '新建',
  editTitle: '编辑'
});
const emits = defineEmits<Emits>();

// 标题
const title = computed(() => {
  return props.action === 'create' ? props.createTitle : props.editTitle;
});
const loading = ref<boolean>(false);
// 表单数据
const modelRef = reactive<FormState>({
  key: '',
  name: '',
  actions: []
});
// 表单校验规则
const rulesRef = reactive({
  key: [
    {
      required: true,
      message: '请输入权限标识'
    }
  ],
  name: [
    {
      required: true,
      message: '请输入权限名称'
    }
  ]
});
const useForm = Form.useForm;
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
// 表单布局
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
// 操作类型
const actions = [
  { value: 'add' },
  { value: 'query' },
  { value: 'update' },
  { value: 'delete' }
];

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      // 编辑，初始化表单
      if (props.action === 'edit' && props.data) {
        modelRef.id = props.data.id;
        modelRef.key = props.data.key;
        modelRef.name = props.data.name;
        modelRef.actions = props.data.actions;
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

    // 模拟接口
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      emits('ok');
    }, 1000);
  });
};
</script>

<style scoped></style>
