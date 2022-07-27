<template>
  <div class="order-descriptions">
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
    <a-space>
      <a-button type="primary" :loading="loading" @click="onNext">确认</a-button>
      <a-button @click="onPrev">上一步</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { StepForm } from './useStepForm';

interface Emits {
  (event: 'next'): void;
  (event: 'prev'): void;
}

const emits = defineEmits<Emits>();

const stepForm = inject<StepForm>('stepForm') as StepForm;
const { formState } = stepForm;
const loading = ref(false);

const onNext = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emits('next');
  }, 1000);
};
const onPrev = () => {
  emits('prev');
};
</script>

<style scoped>
.order-descriptions {
  max-width: 500px;
  margin: 0 auto;
}
</style>
