import { getWholeMenu, getMenuAuthority } from '@/api/permission';

export default function () {
  /** data */
  const menuList = ref<MenuItem[]>([]); // 菜单列表（树）
  const menuTreeCheckedKeys = ref<number[]>([]); // 菜单勾选
  // 菜单列表自定义字段
  const menuTreeFieldNames = {
    children: 'children',
    title: 'name',
    key: 'id'
  };
  const loadingMenuAuthority = ref<boolean>(false); // 加载角色菜单权限

  /** methods */
  // 获取完整菜单列表
  const getMenuList = async () => {
    try {
      const list = await getWholeMenu();
      menuList.value = list;
    } catch (error) {
      menuList.value = [];
      return Promise.reject(error);
    }
  };
  // 获取角色菜单权限
  const getMenuAuthorityList = async (roleId: number) => {
    loadingMenuAuthority.value = true;

    try {
      const { list } = await getMenuAuthority(roleId);
      menuTreeCheckedKeys.value = list;
    } catch (error) {
      menuTreeCheckedKeys.value = [];
      return Promise.reject(error);
    } finally {
      loadingMenuAuthority.value = false;
    }
  };
  // 重置菜单权限选择器
  const resetMenuAuthorityList = () => {
    menuTreeCheckedKeys.value = [];
  };

  /** events */
  // 勾选菜单
  const onCheckMenuTree = (checkedKeys: number[]) => {
    menuTreeCheckedKeys.value = checkedKeys;
  };
  // 点击标签勾选菜单
  const onSelectMenu = (selectedKeys: number[], { selected, node }: any) => {
    if (selected) {
      menuTreeCheckedKeys.value.push(node.id);
    } else {
      const index = menuTreeCheckedKeys.value.findIndex(
        (id: number) => id === node.id
      );
      menuTreeCheckedKeys.value.splice(index, 1);
    }
  };

  return {
    menuList,
    menuTreeCheckedKeys,
    menuTreeFieldNames,
    loadingMenuAuthority,
    getMenuList,
    getMenuAuthorityList,
    resetMenuAuthorityList,
    onCheckMenuTree,
    onSelectMenu
  };
}
