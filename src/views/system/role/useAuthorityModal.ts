import { useRoleAuthority } from '@/store/roleAuthority';

export const useAuthorityModal = () => {
  const showAuthorityModal = ref<boolean>(false); // 是否显示弹窗
  const roleAuthority = useRoleAuthority();

  const onSetAuthority = (role: Role) => {
    roleAuthority.setRoleId(role.id);
    showAuthorityModal.value = true;
  };

  return {
    showAuthorityModal,
    onSetAuthority,
  };
};
