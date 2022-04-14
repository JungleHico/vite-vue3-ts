<template>
  <a-form v-bind="formItemLayout">
    <a-form-item label="input" v-bind="validateInfos.input">
      <a-input v-model:value="modelRef.input" placeholder="输入框" />
    </a-form-item>
    <a-form-item label="inputNumber">
      <a-input-number
        v-model:value="modelRef.inputNumber"
        class="input-number"
        placeholder="数字输入框"
        :min="0"
        :max="100"
        :formatter="integerFormatter"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="textarea">
      <a-textarea
        v-model:value="modelRef.textArea"
        placeholder="文本域"
        :rows="4"
      />
    </a-form-item>
    <a-form-item label="select">
      <a-select v-model:value="modelRef.select" placeholder="选择器">
        <a-select-option value="chinese">语文</a-select-option>
        <a-select-option value="math">数学</a-select-option>
        <a-select-option value="english">英语</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="radio" v-bind="validateInfos.radio">
      <a-radio-group v-model:value="modelRef.radio">
        <a-radio value="male">男</a-radio>
        <a-radio value="female">女</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="checkbox">
      <a-checkbox-group
        v-model:value="modelRef.checkbox"
        :options="fruitOptions"
      />
    </a-form-item>
    <a-form-item label="datePicker">
      <a-date-picker
        v-model:value="modelRef.datePicker"
        placeholder="日期选择器"
        :disabled-date="disableDateBeforeDay"
      />
    </a-form-item>
    <a-form-item label="switch">
      <a-switch v-model:checked="modelRef.switch" />
    </a-form-item>
    <a-form-item label="rate">
      <a-rate v-model:value="modelRef.rate" />
    </a-form-item>
    <a-form-item label="upload">
      <a-upload
        v-model:file-list="modelRef.upload"
        list-type="picture-card"
        accept="image/*"
        :custom-request="customRequest"
      >
        <div v-if="modelRef.upload.length < 3" class="upload-wrapper">
          <plus-outlined></plus-outlined>
          <span class="upload-text">上传图片</span>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item :wrapper-col="submitButtonLayout">
      <a-space>
        <a-button type="primary" @click="onSubmit">提交</a-button>
        <a-button @click="onReset">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import { Form } from 'ant-design-vue';
import { integerFormatter, disableDateBeforeDay } from '@/utils/form';
import { Dayjs } from 'dayjs';
import { UploadProps } from 'ant-design-vue';

type FormState = {
  input: string;
  inputNumber: number | undefined;
  textArea: string;
  select: string | undefined;
  radio: string | undefined;
  checkbox: string[];
  datePicker: Dayjs | undefined;
  switch: boolean;
  rate: number;
  upload: UploadProps[];
};

// 表单数据
const modelRef = reactive<FormState>({
  input: '',
  inputNumber: undefined,
  textArea: '',
  select: undefined,
  radio: undefined,
  checkbox: [],
  datePicker: undefined,
  switch: false,
  rate: 4,
  upload: []
});
// 表单验证规则
const rulesRef = reactive({
  input: [{ required: true, message: '请输入' }],
  radio: [{ required: true, message: '请选择' }]
});
const useForm = Form.useForm;
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};
const submitButtonLayout = {
  offset: 6,
  span: 14
};
const fruitOptions = [
  { label: '苹果', value: 'apple' },
  { label: '桃子', value: 'peach' },
  { label: '香蕉', value: 'banana' }
];

// 初始化图片列表
const initUpload = () => {
  const url =
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  const image = {
    uid: '-1',
    name: url.substring(url.lastIndexOf('/') + 1),
    status: 'done',
    url
  };
  modelRef.upload.push(image);
};

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
// 提交表单
const onSubmit = () => {
  validate().then(() => {
    console.log('onSubmit', modelRef);
  });
};
// 重置表单
const onReset = () => {
  resetFields();
  initUpload();
};

initUpload();
</script>

<style scoped lang="less">
.input-number {
  width: 128px;
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
