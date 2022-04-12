<template>
  <a-form
    :model="formState"
    v-bind="formItemLayout"
    :rules="rules"
    @finish="onSubmit"
  >
    <a-form-item label="input" name="input">
      <a-input v-model:value="formState.input" placeholder="输入框" />
    </a-form-item>
    <a-form-item label="inputNumber">
      <a-input-number
        v-model:value="formState.inputNumber"
        class="input-number"
        placeholder="数字输入框"
        :min="0"
        :max="100"
        :formatter="integerFormatter"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="textarea">
      <a-textarea
        v-model:value="formState.textArea"
        placeholder="文本域"
        :rows="4"
      />
    </a-form-item>
    <a-form-item label="select">
      <a-select v-model:value="formState.select" placeholder="选择器">
        <a-select-option value="chinese">语文</a-select-option>
        <a-select-option value="math">数学</a-select-option>
        <a-select-option value="english">英语</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="radio" name="radio">
      <a-radio-group v-model:value="formState.radio">
        <a-radio value="male">男</a-radio>
        <a-radio value="female">女</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="checkbox">
      <a-checkbox-group
        v-model:value="formState.checkbox"
        :options="fruitOptions"
      />
    </a-form-item>
    <a-form-item label="datePicker">
      <a-date-picker
        v-model:value="formState.datePicker"
        placeholder="日期选择器"
        :disabled-date="disableDateBeforeDay"
      />
    </a-form-item>
    <a-form-item label="switch">
      <a-switch v-model:checked="formState.switch" />
    </a-form-item>
    <a-form-item label="rate">
      <a-rate v-model:value="formState.rate" />
    </a-form-item>
    <a-form-item label="upload">
      <a-upload
        v-model:file-list="formState.upload"
        list-type="picture-card"
        accept="image/*"
        :custom-request="customRequest"
      >
        <div v-if="formState.upload.length < 3" class="upload-wrapper">
          <plus-outlined></plus-outlined>
          <span class="upload-text">上传图片</span>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item :wrapper-col="submitButtonLayout">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
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
  upload: []
});
const rules = {
  input: [{ required: true, message: '请输入' }],
  radio: [{ required: true, message: '请选择' }]
};
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
  formState.upload.push(image);
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
  //     const index = formState.upload.findIndex(
  //       (image: any) => image.uid === uid
  //     );
  //     if (index >= 0) {
  //       formState.upload.splice(index, 1);
  //     }
  //   });

  // 模拟上传
  setTimeout(() => {
    res.onSuccess();
  }, 2000);
};
// 提交表单
const onSubmit = () => {
  console.log('onSubmit', formState);
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
