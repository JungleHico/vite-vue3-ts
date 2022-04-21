<template>
  <a-modal
    :visible="visible"
    :title="title"
    :confirm-loading="loading"
    :mask-closable="false"
    @ok="onOk"
  >
    <a-form v-bind="formItemLayout">
      <a-form-item v-if="action === 'edit'" label="ID">
        <a-input v-model:value="modelRef.id" disabled />
      </a-form-item>
      <a-form-item label="帐号" v-bind="validateInfos.account">
        <a-input v-model:value="modelRef.account" />
      </a-form-item>
      <a-form-item label="用户名" v-bind="validateInfos.username">
        <a-input v-model:value="modelRef.username" />
      </a-form-item>
      <a-form-item label="手机号" v-bind="validateInfos.phone">
        <a-input-number
          v-model:value="modelRef.phone"
          class="input-number"
          :formatter="integerFormatter"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="用户角色" v-bind="validateInfos.roles">
        <a-select v-model:value="modelRef.roles" mode="multiple">
          <a-select-option
            v-for="role in roles"
            :key="role.id"
            :value="role.name"
            >{{ role.desc }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="头像">
        <a-upload
          v-model:file-list="modelRef.avatar"
          list-type="picture-card"
          accept="image/*"
          :custom-request="customRequest"
        >
          <div v-if="modelRef.avatar.length < 1" class="upload-wrapper">
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
import { UploadProps, Form } from 'ant-design-vue';
import { Rule } from 'ant-design-vue/es/form';
import { integerFormatter, checkPhoneNumber } from '@/utils/form';
import { getAllRoles } from '@/api/permission';

type Props = {
  visible: boolean;
  action: Action;
  data?: User | null;
};
type Emits = {
  (event: 'ok'): void;
};
type FormState = {
  id?: number;
  account: string;
  username: string;
  avatar: UploadProps[];
  phone: string;
  roles: string[];
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

// 标题
const title = computed(() => {
  return props.action === 'create' ? '新增用户' : '编辑用户';
});
const loading = ref<boolean>(false);
// 表单布局
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
// 表单数据
const modelRef = reactive<FormState>({
  account: '',
  username: '',
  avatar: [],
  phone: '',
  roles: []
});
// 表单验证规则
const rulesRef = reactive({
  account: [{ required: true, message: '请输入帐号' }],
  username: [{ required: true, message: '请输入用户名' }],
  phone: [
    { required: true, message: '请输入手机号' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  roles: [{ required: true, message: '请选择用户角色' }]
});
const { resetFields, validate, validateInfos } = Form.useForm(
  modelRef,
  rulesRef
);
const roles = ref<Role[]>([]);

const getRoles = async () => {
  try {
    const list = await getAllRoles();
    roles.value = list;
  } catch (error) {
    return Promise.reject(error);
  }
};
// 验证手机号
async function validatePhone(_rule: Rule, value: string) {
  if (checkPhoneNumber(modelRef.phone)) {
    return Promise.resolve();
  }
  return Promise.reject('请输入正确的手机号码');
}
// 自定义图片上传
const customRequest = (res: any) => {
  // 调用接口上传
  // const formData = new FormData();
  // formData.append('files', res.file);
  // const uid = res.file.uid;
  // axios
  //   .post('/api/upload', formData, {
  //     onUploadProgress(progressEvent: any) {
  //       // 显示上传进度
  //       const percent = Math.floor(
  //         (progressEvent.loaded / progressEvent.total) * 100
  //       );
  //       res.onProgress({ percent });
  //     }
  //   })
  //   .then(() => {
  //     res.onSuccess();
  //   })
  //   .catch(() => {
  //     res.onError();
  //     // 上传失败，移除图片
  //     const index = modelRef.upload.findIndex(
  //       (image: any) => image.uid === uid
  //     );
  //     if (index >= 0) {
  //       modelRef.upload.splice(index, 1);
  //     }
  //   });

  // 模拟上传
  setTimeout(() => {
    res.onSuccess();
  }, 2000);
};

watch(
  () => props.visible,
  async (visible: boolean) => {
    if (visible) {
      if (props.action === 'edit' && props.data) {
        modelRef.id = props.data.id;
        modelRef.account = props.data.account;
        modelRef.username = props.data.username;
        modelRef.phone = props.data.phone;
        modelRef.roles = props.data.roles;
        // 设置头像
        const avatar = props.data.avatar;
        if (avatar !== '') {
          const image = {
            uid: '-1',
            name: avatar.substring(avatar.lastIndexOf('/') + 1),
            status: 'done',
            url: avatar
          };
          modelRef.avatar.push(image);
        }
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

    // 模拟接口
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      emits('ok');
    }, 1000);
  });
};

getRoles();
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
