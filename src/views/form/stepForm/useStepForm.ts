import { validatePhone } from '@/utils/form';
import { Rule } from 'ant-design-vue/es/form';
import { Form } from 'ant-design-vue';

export interface StepForm {
  formState: FormState;
  validateInfos: any;
  validate: any;
  resetFields: any;
}

interface FormState {
  name: string;
  phone: string;
  address: string;
  remark: string;
}

export const useStepForm = (): StepForm => {
  const formState = reactive<FormState>({
    name: '',
    phone: '',
    address: '',
    remark: '',
  });
  const rules = reactive({
    name: [{ required: true, message: '请输入联系人姓名' }],
    phone: [
      { required: true, message: '请输入联系电话' },
      { validator: validatePhone, trigger: 'change' },
    ],
    address: [{ required: true, message: '请输入送货地址' }],
  });

  const useForm = Form.useForm;
  const { validateInfos, validate, resetFields } = useForm(formState, rules);

  return {
    formState,
    validateInfos,
    validate,
    resetFields,
  };
};
