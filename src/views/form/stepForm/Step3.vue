<template>
  <a-result status="success" title="订单提交成功" sub-title="订单处理中，请耐心等待">
    <template #extra>
      <a-button type="primary" @click="onNewOrder">再下一单</a-button>
      <a-button>查看订单</a-button>
    </template>
    <a-descriptions :column="1">
      <a-descriptions-item label="联系人">
        {{ formState.name }}
      </a-descriptions-item>
      <a-descriptions-item label="联系电话">
        {{ formState.phone }}
      </a-descriptions-item>
      <a-descriptions-item label="送货地址">
        {{ formState.address }}
      </a-descriptions-item>
      <a-descriptions-item label="留言">
        {{ formState.remark }}
      </a-descriptions-item>
    </a-descriptions>
  </a-result>
</template>

<script setup lang="ts">
import { StepForm } from './useStepForm';

interface Emits {
  (event: 'newOrder'): void;
}

const emits = defineEmits<Emits>();

const stepForm = inject<StepForm>('stepForm') as StepForm;
const { formState, resetFields } = stepForm;

const onNewOrder = () => {
  resetFields();
  emits('newOrder');
};
</script>

<style scoped></style>
