import http from '@/utils/http';

// 获取api列表
export const getApis = (params: PaginationParams = {}) =>
  http.get<ResponseList<Api>>('/api/apiList', { params });

// 获取所有api
export const getAllApis = () => http.get<Api[]>('/api/allApis');

// 获取菜单列表
export const getMenu = (params: PaginationParams = {}) =>
  http.get<ResponseList<MenuItem>>('/api/menu', { params });

// 获取完整菜单
export const getWholeMenu = () => http.get<MenuItem[]>('/api/wholeMenu');

// 获取角色列表
export const getRoles = (params: PaginationParams = {}) =>
  http.get<ResponseList<Role>>('/api/roles', { params });

// 获取所有角色
export const getAllRoles = () => http.get<Role[]>('/api/allRoles');

// 获取角色的菜单权限
export const getMenuAuthority = (roleId: number) =>
  http.get<ResponseList<number>>('/api/menuAuthority', { params: { roleId } });

// 获取角色的接口权限
export const getApiAuthority = (roleId: number) =>
  http.get<number[]>('/api/apiAuthority', { params: { roleId } });

// 获取用户列表
export const getUsers = (params: PaginationParams = {}) =>
  http.get<ResponseList<User>>('/api/users', { params });
