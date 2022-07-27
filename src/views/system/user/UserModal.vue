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
      <a-form-item v-if="action === 'edit'" label="用户ID">
        <a-input v-model:value="formState.userId" disabled />
      </a-form-item>
      <a-form-item label="用户名" v-bind="validateInfos.username">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="昵称" v-bind="validateInfos.nickname">
        <a-input v-model:value="formState.nickname" />
      </a-form-item>
      <a-form-item label="手机号" v-bind="validateInfos.phone">
        <a-input-number
          v-model:value="formState.phone"
          class="input-number"
          :controls="false"
          :formatter="integerFormatter"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="角色" v-bind="validateInfos.roles">
        <a-select v-model:value="formState.roles" mode="multiple">
          <a-select-option v-for="role in roleList" :key="role.id" :value="role.name">
            {{ role.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="头像">
        <a-upload
          v-model:file-list="formState.avatar"
          list-type="picture-card"
          accept="image/*"
          :custom-request="customRequest"
        >
          <div v-if="formState.avatar && formState.avatar.length < 1" class="upload-wrapper">
            <plus-outlined></plus-outlined>
            <span class="upload-text">上传头像</span>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import { formItemLayout } from './data';
import { integerFormatter } from '@/utils/form';
import { useUserForm } from './useUserForm';
import { useRoleList } from './useRoleList';

interface Props {
  visible: boolean;
  action: Action;
  data?: User | null;
}
interface Emits {
  (event: 'update:visible', value: boolean): void;
  (event: 'update'): void; // 通知父组件更新数据
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const title = computed(() => {
  return props.action === 'create' ? '新增用户' : '编辑用户';
});
const confirmLoading = ref<boolean>(false);

// 表单
const { formState, validateInfos, validate, resetFields, dataToFormState } = useUserForm();

// 角色列表
const { roleList } = useRoleList();

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

// 自定义图片上传
const customRequest = (res: any) => {
  // TODO 调用接口上传
  // 模拟上传
  setTimeout(() => {
    res.onSuccess();
  }, 2000);
};

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

<style scoped lang="less">
.input-number {
  width: 100%;
}
.upload-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .upload-text {
    margin-top: 8px;
  }
}
</style>
