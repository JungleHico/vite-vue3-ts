import { defineStore } from 'pinia';

interface RoleAuthorityState {
  roleId: number; // 当前角色ID
  menuAuthorityIds: number[]; // 当前角色菜单权限
  apiAuthorityIds: number[]; // 当前角色 API 权限
}

export const useRoleAuthority = defineStore('roleAuthority', {
  state: (): RoleAuthorityState => {
    return {
      roleId: 0,
      menuAuthorityIds: [],
      apiAuthorityIds: [],
    };
  },
  actions: {
    setRoleId(roleId: number) {
      this.roleId = roleId;
    },
    setMenuAuthorityIds(menuAuthorityIds: number[]) {
      this.menuAuthorityIds = menuAuthorityIds;
    },
    setApiAuthorityIds(apiAuthorityIds: number[]) {
      this.apiAuthorityIds = apiAuthorityIds;
    },
  },
});
