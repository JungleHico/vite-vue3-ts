import { getAllRoles } from '@/api/system';

// 获取角色列表
export const useRoleList = () => {
  const roleList = ref<Role[]>([]);

  const getRoles = async () => {
    try {
      const data = await getAllRoles();
      roleList.value = data;
    } catch (error) {
      roleList.value = [];
      return Promise.reject(error);
    }
  };

  getRoles();

  return {
    roleList,
  };
};
