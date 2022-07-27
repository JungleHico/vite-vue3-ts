import { reactive } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';

interface FormState {
  username: string;
  password: string;
}

export const useLoginForm = () => {
  const formState = reactive<FormState>({
    username: '',
    password: '',
  });

  const rules: Record<string, Rule[]> = {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
  };

  return {
    formState,
    rules,
  };
};
