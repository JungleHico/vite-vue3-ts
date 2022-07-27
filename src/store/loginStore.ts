import { defineStore } from 'pinia';
import { login, getUserInfo } from '@/api/user';

interface LoginState {
  userInfo: UserInfo | null; // 用户基本信息，用于判断是否登录
}

export const useLoginStore = defineStore('login', {
  state: (): LoginState => {
    return {
      userInfo: null,
    };
  },
  actions: {
    // 登录
    async login(account: Account) {
      try {
        const data = await login(account);
        // 本地缓存 token
        localStorage.setItem('token', data.token);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 获取用户基本信息
    async getUserInfo() {
      try {
        const data = await getUserInfo();
        this.userInfo = data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 退出登录
    async logout() {
      // TODO 退出登录接口
      // 移除 token，清空个人信息
      localStorage.removeItem('token');
      this.userInfo = null;
    },
  },
});
