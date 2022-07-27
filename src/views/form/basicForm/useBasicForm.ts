import { Dayjs } from 'dayjs';
import type { UploadProps } from 'ant-design-vue';
import { Form } from 'ant-design-vue';

interface FormState {
  input: string;
  inputNumber: number | undefined;
  textArea: string;
  select: string | undefined;
  radio: string | undefined;
  checkbox: string[];
  datePicker: Dayjs | undefined;
  switch: boolean;
  rate: number;
  upload: UploadProps['fileList'];
}

export const useBasicForm = () => {
  const formState = reactive<FormState>({
    input: '',
    inputNumber: undefined,
    textArea: '',
    select: undefined,
    radio: undefined,
    checkbox: [],
    datePicker: undefined,
    switch: false,
    rate: 4,
    upload: [],
  });
  const rules = reactive({
    input: [{ required: true, message: '请输入' }],
    radio: [{ required: true, message: '请选择' }],
  });

  const useForm = Form.useForm;
  const { validateInfos, validate, resetFields } = useForm(formState, rules);

  // 初始化图片列表
  const initUpload = () => {
    const url = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    formState.upload?.push({
      uid: '-1',
      name: url.substring(url.lastIndexOf('/') + 1),
      status: 'done',
      url,
    });
  };

  return {
    formState,
    validateInfos,
    validate,
    resetFields,
    initUpload,
  };
};
