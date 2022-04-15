import http from '@/utils/http';

// 获取权限列表
export const getPermissions = () =>
  http.get<ResponseList<Permission>>('/api/permissions');
