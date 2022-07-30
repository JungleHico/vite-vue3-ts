<template>
  <div class="login">
    <div class="title-wrapper">
      <img class="logo" src="@/assets/images/logo.png" alt="logo" />
      <span class="title">后台管理系统</span>
    </div>

    <div class="form">
      <a-form :model="formState" :rules="rules" @finish="onLogin">
        <a-form-item name="username">
          <a-input v-model:value="formState.username" size="large" placeholder="用户名：admin">
            <template #prefix>
              <user-outlined class="input-icon"></user-outlined>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password
            v-model:value="formState.password"
            size="large"
            placeholder="密码：123456"
          >
            <template #prefix>
              <lock-outlined class="input-icon"></lock-outlined>
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="large" block html-type="submit" :loading="loading"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useLoginForm } from './useLoginForm';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useLoginStore } from '@/store/modules/loginStore';

const { formState, rules } = useLoginForm();
const router = useRouter();
const route = useRoute();
const loginStore = useLoginStore();
const loading = ref(false);

const onLogin = async (values: any) => {
  const { username, password } = values;
  loading.value = true;

  try {
    await loginStore.login({
      username,
      password,
    });
    const { redirect } = route.query;
    if (redirect) {
      router.push(redirect as string);
    } else {
      router.push('/');
    }
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
