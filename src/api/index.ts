import http from '@/utils/http';

export const getUserInfo = () => http.get<User>('/api/userInfo');
