<template>
  <a-form v-bind="formItemLayout">
    <a-form-item label="联系人" v-bind="validateInfos.name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="联系电话" v-bind="validateInfos.phone">
      <a-input-number
        class="input-number"
        v-model:value="formState.phone"
        :formatter="integerFormatter"
        :controls="false"
      />
    </a-form-item>
    <a-form-item label="送货地址" v-bind="validateInfos.address">
      <a-textarea v-model:value="formState.address" :rows="3" />
    </a-form-item>
    <a-form-item label="留言">
      <a-textarea v-model:value="formState.remark" :rows="3" />
    </a-form-item>
    <a-form-item :wrapper-col="stepsButtonLayout">
      <a-button type="primary" @click="onNext">下一步</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { integerFormatter } from '@/utils/form';
import { StepForm } from './useStepForm';

interface Emits {
  (event: 'next'): void;
}

const emits = defineEmits<Emits>();

const stepForm = inject<StepForm>('stepForm') as StepForm;
const { formState, validateInfos, validate } = stepForm;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const stepsButtonLayout = {
  offset: 4,
  span: 14,
};

const onNext = async () => {
  try {
    await validate();
    emits('next');
  } catch (error) {
    console.log('error', error);
  }
};
</script>

<style scoped>
.input-number {
  width: 100%;
}
</style>
