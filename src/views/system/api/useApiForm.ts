import { Form } from 'ant-design-vue';

interface FormState {
  path: string;
  method: string;
  desc: string;
  group: string;
}

export const useApiForm = () => {
  const formState = reactive<FormState>({
    path: '',
    method: '',
    desc: '',
    group: '',
  });
  const rules = reactive({
    path: [{ required: true, message: '请输入API路径' }],
    method: [{ required: true, message: '请输入API方法' }],
    desc: [{ required: true, message: '请输入描述' }],
  });
  const useForm = Form.useForm;
  const { modelRef, ...userForm } = useForm(formState, rules);

  // 编辑，设置表单
  const dataToFormState = (data: Api, formState: FormState) => {
    formState.path = data.path;
    formState.method = data.method;
    formState.desc = data.desc;
    formState.group = data.group;
  };

  return {
    formState: modelRef as FormState,
    ...userForm,
    dataToFormState,
  };
};
