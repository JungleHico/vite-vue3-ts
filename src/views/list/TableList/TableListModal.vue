<template>
  <a-modal
    :visible="visible"
    :title="title"
    :confirm-loading="loading"
    @ok="onOk"
  >
    <a-form v-bind="formItemLayout">
      <a-form-item label="ID">
        <a-input v-model:value="modelRef.id" disabled />
      </a-form-item>
      <a-form-item label="描述" v-bind="validateInfos.desc">
        <a-input v-model:value="modelRef.desc" />
      </a-form-item>
      <a-form-item label="状态">
        <a-switch
          v-model:checked="modelRef.online"
          checked-children="开"
          un-checked-children="关"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { Form } from 'ant-design-vue';

type Props = {
  visible: boolean;
  action: Action;
  data?: TableListItem | null;
};
type Emits = {
  (event: 'update:visible', value: boolean): void;
  (event: 'ok'): void;
};
type FormState = {
  id?: number;
  desc: string;
  online: boolean;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const title = computed(() => {
  return props.action === 'create' ? '新建' : '编辑';
});
// 表单数据
const modelRef = reactive<FormState>({
  desc: '',
  online: false
});
// 表单校验规则
const rulesRef = reactive({
  desc: [
    {
      required: true,
      message: '请输入描述'
    }
  ]
});
const useForm = Form.useForm;
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};
const loading = ref<boolean>(false);

const onOk = () => {
  validate().then(() => {
    if (props.action === 'create') {
      // TODO 创建数据
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

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      // 编辑，初始化表单
      if (props.action === 'edit' && props.data) {
        modelRef.id = props.data.id;
        modelRef.desc = props.data.desc;
        modelRef.online = props.data.status === 1;
      }
    } else {
      // 关闭弹窗，重置表单
      resetFields();
    }
  }
);
</script>

<style scoped></style>
