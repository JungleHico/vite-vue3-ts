import { getAllRoles } from '@/api/system';
import ConfirmModal from '@/plugins/ConfirmModal';

export const useRoleList = () => {
  const roleList = ref<Role[]>([]);
  const loading = ref<boolean>(false);

  const getList = async () => {
    loading.value = true;

    try {
      const data = await getAllRoles();
      roleList.value = data;
    } catch (error) {
      roleList.value = [];
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  // 删除
  const onRemove = (record: TableListItem) => {
    ConfirmModal.error({
      title: '确定删除当前角色吗？',
      onOk: async () => {
        // 模拟接口
        await new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
        getList();
      },
    });
  };

  return {
    roleList,
    loading,
    getList,
    onRemove,
  };
};
