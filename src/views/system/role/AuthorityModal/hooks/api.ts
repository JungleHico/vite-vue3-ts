import { getAllApis, getApiAuthority } from '@/api/permission';

type ApiNode = {
  id: number | string;
  title: string;
  children?: ApiNode[];
};

export default function () {
  /** data */
  const apiList = ref<ApiNode[]>([]); // API列表（树）
  const apiTreeCheckedKeys = ref<number[]>([]); // 勾选
  // API列表自定义字段
  const apiTreeFieldNames = {
    children: 'children',
    title: 'title',
    key: 'id'
  };
  const loadingApiAuthority = ref<boolean>(false); // 加载用户API权限

  /** methods */
  // 将API列表转化为树形结构
  const getApiTree = (ApiList: Api[]): ApiNode[] => {
    const tree: ApiNode[] = [];
    ApiList.forEach((api: Api) => {
      const apiNode = {
        id: api.id,
        title: api.desc
      };

      if (api.group && api.group !== '') {
        // API已分组
        const group = tree.find((group: ApiNode) => group.id === api.group);
        if (group) {
          // 已建立分组
          group.children?.push(apiNode);
        } else {
          // 未建立分组
          const newGroup: ApiNode = {
            id: api.group,
            title: api.group,
            children: []
          };
          newGroup.children?.push(apiNode);
          tree.push(newGroup);
        }
      } else {
        // API未分组
        tree.push(apiNode);
      }
    });
    return tree;
  };
  // 获取完整API列表
  const getApiList = async () => {
    try {
      const list = await getAllApis();
      apiList.value = getApiTree(list);
    } catch (error) {
      apiList.value = [];
      return Promise.reject(error);
    }
  };
  // 获取角色API权限
  const getApiAuthorityList = async (roleId: number) => {
    loadingApiAuthority.value = true;

    try {
      const list = await getApiAuthority(roleId);
      apiTreeCheckedKeys.value = list;
    } catch (error) {
      apiTreeCheckedKeys.value = [];
      return Promise.reject(error);
    } finally {
      loadingApiAuthority.value = false;
    }
  };
  // 重置API权限选择器
  const resetApiAuthorityList = () => {
    apiTreeCheckedKeys.value = [];
  };

  /** events */
  // 勾选API
  const onCheckApiTree = (checkedKeys: number[]) => {
    apiTreeCheckedKeys.value = checkedKeys;
  };
  // 点击标签勾选API
  const onSelectApi = (selectedKeys: number[], { selected, node }: any) => {
    if (selected) {
      apiTreeCheckedKeys.value.push(node.id);
    } else {
      const index = apiTreeCheckedKeys.value.findIndex(
        (id: number) => id === node.id
      );
      apiTreeCheckedKeys.value.splice(index, 1);
    }
  };

  return {
    apiList,
    apiTreeCheckedKeys,
    apiTreeFieldNames,
    loadingApiAuthority,
    getApiList,
    getApiAuthorityList,
    resetApiAuthorityList,
    onCheckApiTree,
    onSelectApi
  };
}
