<template>
  <div class="login">
    <div class="title-wrapper">
      <img class="logo" src="@/assets/images/logo.png" alt="logo" />
      <span class="title">后台管理系统</span>
    </div>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      class="form"
      @finish="onLogin"
    >
      <a-form-item name="account">
        <a-input
          v-model:value="formState.account"
          size="large"
          placeholder="账号"
        >
          <template #prefix>
            <user-outlined class="input-icon"></user-outlined>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="formState.password"
          size="large"
          placeholder="密码"
        >
          <template #prefix>
            <lock-outlined class="input-icon"></lock-outlined>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item html-type="submit">
        <a-button
          type="primary"
          block
          size="large"
          html-type="submit"
          :loading="loading"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/store/loginStore';

type FormState = {
  account: string;
  password: string;
};

// data
const router = useRouter();
const loginStore = useLoginStore();
// 表单数据
const formRef = ref();
const formState = reactive<FormState>({
  account: '',
  password: ''
});
const rules = {
  account: [{ required: true, message: '请输入帐号' }],
  password: [{ required: true, message: '请输入密码' }]
};
const loading = ref<boolean>(false);

// methods
const onLogin = async (values: FormState) => {
  loading.value = true;

  try {
    await loginStore.login(values);
    router.push('/');
  } catch (error) {
    return Promise.reject(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  .title-wrapper {
    display: flex;
    align-items: center;
    margin-top: 64px;
    .logo {
      width: 80px;
      height: auto;
    }
    .title {
      margin-left: 16px;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
.form {
  margin-top: 64px;
  width: 340px;
  .input-icon {
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
