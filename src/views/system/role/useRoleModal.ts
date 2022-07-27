export const useRoleModal = () => {
  const showRoleModal = ref<boolean>(false);
  const action = ref<Action>('create');
  const currentRole = ref<Role | null>(null);

  // 新增角色
  const onCreate = () => {
    action.value = 'create';
    showRoleModal.value = true;
  };

  // 编辑角色
  const onEdit = (record: Role) => {
    action.value = 'edit';
    currentRole.value = record;
    showRoleModal.value = true;
  };

  return {
    showRoleModal,
    action,
    currentRole,
    onCreate,
    onEdit,
  };
};
