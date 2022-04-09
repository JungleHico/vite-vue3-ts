import { defineStore } from 'pinia';
import { login, getUserInfo } from '@/api/login';

type LoginState = {
  info: UserInfo | null; // 用户基本信息，用于判断是否登录
};

export const useLoginStore = defineStore('login', {
  state: (): LoginState => {
    return {
      info: null
    };
  },
  actions: {
    // 封装登录接口
    async login(account: Account) {
      try {
        const data = await login(account);
        // 缓存token
        localStorage.setItem('token', data.token);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 获取用户基本信息
    async getUserInfo() {
      try {
        const data = await getUserInfo();
        this.info = data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 退出登录
    logout() {
      // TODO 退出登录接口（如果需要）
      // 移除token，清空个人信息
      localStorage.removeItem('token');
      this.info = null;
    }
  }
});
