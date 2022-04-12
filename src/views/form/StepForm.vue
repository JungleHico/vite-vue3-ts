<template>
  <div>
    <a-steps class="steps" :current="current">
      <a-step title="填写订单"></a-step>
      <a-step title="确认订单"></a-step>
      <a-step title="完成"></a-step>
    </a-steps>
    <div class="steps-content">
      <a-form
        v-if="current === 0"
        :model="formState"
        :rules="rules"
        v-bind="formItemLayout"
        @finish="onNext"
      >
        <a-form-item label="联系人" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="联系电话" name="phone">
          <a-input-number
            class="input-number"
            v-model:value="formState.phone"
            :formatter="integerFormatter"
            :controls="false"
          />
        </a-form-item>
        <a-form-item label="送货地址" name="address">
          <a-textarea v-model:value="formState.address" :rows="3" />
        </a-form-item>
        <a-form-item label="留言" name="remark">
          <a-textarea v-model:value="formState.remark" :rows="3" />
        </a-form-item>
        <a-form-item :wrapper-col="stepsButtonLayout">
          <a-button type="primary" html-type="submit">下一步</a-button>
        </a-form-item>
      </a-form>

      <template v-if="current === 1">
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
            <a-button type="primary" @click="onNext">确认</a-button>
            <a-button @click="onPrev">上一步</a-button>
          </a-space>
        </div>
      </template>

      <template v-if="current === 2">
        <a-result
          status="success"
          title="订单提交成功"
          sub-title="订单处理中，请耐心等待"
        >
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { integerFormatter, checkPhoneNumber } from '@/utils/form';
import { Rule } from 'ant-design-vue/es/form';

type FormState = {
  name: string;
  phone: string;
  address: string;
  remark: string;
};

// 验证手机号
async function validatePhone(_rule: Rule, value: string) {
  if (checkPhoneNumber(formState.phone)) {
    return Promise.resolve();
  }
  return Promise.reject('请输入正确的手机号码');
}

const current = ref<number>(0);
const formState = reactive<FormState>({
  name: '',
  phone: '',
  address: '',
  remark: ''
});
const rules = {
  name: [{ required: true, message: '请输入联系人姓名' }],
  phone: [
    { required: true, message: '请输入联系电话' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  address: [{ required: true, message: '请输入送货地址' }]
};
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};
const stepsButtonLayout = {
  offset: 4,
  span: 14
};

const onNext = () => {
  current.value++;
};
const onPrev = () => {
  current.value--;
};
const onNewOrder = () => {
  formState.name = '';
  formState.phone = '';
  formState.address = '';
  formState.remark = '';
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
.input-number {
  width: 100%;
}
.order-descriptions {
  max-width: 500px;
  margin: 0 auto;
}
</style>
