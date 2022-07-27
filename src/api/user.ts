import { get, post } from '@/utils/http';

// 登录
export const login = (account: Account) => post<Token>('/user/login', account);

// 获取用户基本信息
export const getUserInfo = () => get<UserInfo>('/user/info');
