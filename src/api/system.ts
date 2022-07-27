import { get } from '@/utils/http';

// 查询角色列表
export const getAllRoles = () => get<Role[]>('/system/getAllRoles');

// 查询用户列表
export const getUserList = (params: PaginationParams) =>
  get<ResponseListData<User>>('/system/getUserList', params);

// 查询菜单列表
export const getMenuList = () => get<MenuListItem[]>('/system/getMenuList');

// 获取当前角色菜单权限
export const getMenuAuthority = (roleId: number) =>
  get<number[]>('/system/getMenuAuthority', { roleId });

// 查询 API 列表
export const getApiList = (params: PaginationParams) =>
  get<ResponseListData<Api>>('/system/getApiList');

// 查询所有 API 列表
export const getAllApiList = () => get<Api[]>('/system/getAllApiList');

// 查询当前角色 API 权限
export const getApiAuthority = (roleId: number) =>
  get<number[]>('/system/getApiAuthority', { roleId });
