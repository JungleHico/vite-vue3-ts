<template>
  <a-modal
    :visible="visible"
    :title="title"
    :confirm-loading="loading"
    @ok="onOk"
  >
    <a-spin :spinning="loadingPermissions">
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
        <a-form-item label="角色权限">
          <a-descriptions v-if="permissionList.length" :column="1">
            <a-descriptions-item
              v-for="(permission, i) in permissionList"
              :key="permission.id"
              :label="permission.name"
            >
              <a-checkbox-group
                v-if="modelRef.permissions.length"
                v-model:value="modelRef.permissions[i].actions"
                :options="
                  permission.actions.map((action) => ({
                    label: action,
                    value: action
                  }))
                "
              >
              </a-checkbox-group>
            </a-descriptions-item>
          </a-descriptions>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { Form } from 'ant-design-vue';
import { getPermissions } from '@/api/permission';

type Props = {
  visible: boolean;
  action: Action;
  data?: Role | null;
  createTitle?: string;
  editTitle?: string;
};
type Emits = {
  (event: 'update:visible', value: boolean): void;
  (event: 'ok'): void;
};
type FormState = {
  id?: number;
  name: string;
  desc: string;
  permissions: Permission[];
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
  name: '',
  desc: '',
  permissions: []
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
// 权限列表
const permissionList = reactive<Permission[]>([]);
const loadingPermissions = ref<boolean>(false);

const getPermissionList = async () => {
  loadingPermissions.value = true;

  try {
    const res = await getPermissions();
    permissionList.splice(0, permissionList.length, ...res.list);
  } catch (error) {
    permissionList.splice(0, permissionList.length);
    return Promise.reject(error);
  } finally {
    loadingPermissions.value = false;
  }
};

watch(
  () => props.visible,
  async (visible: boolean) => {
    if (visible) {
      // 初始化权限列表
      if (!permissionList.length) {
        await getPermissionList();
      }
      // 编辑，初始化表单
      if (props.action === 'edit' && props.data) {
        modelRef.id = props.data.id;
        modelRef.name = props.data.name;
        modelRef.desc = props.data.desc;
        modelRef.permissions = props.data.permissions;
      }
      // 新建
      if (props.action === 'create') {
        // 表单追加权限列表
        modelRef.permissions = permissionList.map((permission: Permission) => {
          return {
            ...permission,
            actions: []
          };
        });
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
