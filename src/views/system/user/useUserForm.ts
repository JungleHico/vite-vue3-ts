import { Form } from 'ant-design-vue';
import type { UploadProps } from 'ant-design-vue';
import { validatePhone } from '@/utils/form';

interface FormState {
  userId?: number;
  username: string;
  nickname: string;
  phone: string;
  roles: string[];
  avatar: UploadProps['fileList'];
}

export const useUserForm = () => {
  const formState = reactive<FormState>({
    username: '',
    nickname: '',
    phone: '',
    roles: [],
    avatar: [],
  });
  const rules = reactive({
    username: [{ required: true, message: '请输入用户名' }],
    nickname: [{ required: true, message: '请输入昵称' }],
    phone: [
      { required: true, message: '请输入手机号' },
      { validator: validatePhone, trigger: 'change' },
    ],
    roles: [{ required: true, message: '请选择用户角色' }],
  });
  const useForm = Form.useForm;
  const { modelRef, ...userForm } = useForm(formState, rules);

  // 编辑，设置表单
  const dataToFormState = (data: User, formState: FormState) => {
    formState.userId = data.userId;
    formState.username = data.username;
    formState.nickname = data.nickname;
    formState.phone = data.phone;
    formState.roles = data.roles;
    // 初始化头像
    formState.avatar = [];
    const avatar = data.avatar;
    if (avatar !== '') {
      formState.avatar.push({
        uid: '-1',
        name: avatar.substring(avatar.lastIndexOf('/') + 1),
        status: 'done',
        url: avatar,
      });
    }
  };

  return {
    formState: modelRef as FormState,
    ...userForm,
    dataToFormState,
  };
};
