import http from '@/utils/http';

// 登录
export const login = (account: Account) =>
  http.post<Token>('/api/login', account);

// 获取用户基本信息
export const getUserInfo = () => http.get<UserInfo>('/api/userInfo');
