<template>
  <div>
    <a-steps class="steps" :current="current">
      <a-step title="填写订单"></a-step>
      <a-step title="确认订单"></a-step>
      <a-step title="完成"></a-step>
    </a-steps>
    <div class="steps-content">
      <step1 v-if="current === 0" key="step1" @next="onNext"></step1>
      <step2 v-if="current === 1" key="step2" @next="onNext" @prev="onPrev"></step2>
      <step3 v-if="current === 2" key="step3" @new-order="onNewOrder"></step3>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StepForm',
};
</script>

<script setup lang="ts">
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';
import Step3 from './Step3.vue';
import { useStepForm } from './useStepForm';
import { StepForm } from './useStepForm';

const current = ref(0);
// 子组件公用表单数据
provide<StepForm>('stepForm', useStepForm());

const onNext = () => {
  current.value++;
};
const onPrev = () => {
  current.value--;
};
const onNewOrder = () => {
  current.value = 0;
};
</script>

<style scoped>
.steps {
  max-width: 750px;
  margin: 0 auto;
}
.steps-content {
  max-width: 750px;
  margin: 0 auto;
  padding: 64px 0;
}
</style>
