import { Form } from 'ant-design-vue';

interface FormState {
  parentId: number | null;
  name: string;
  path: string;
  title: string;
  icon: string;
  component: string;
  sort: number;
  keepAlive: 0 | 1;
  hidden: 0 | 1;
}
interface MenuTreeItem {
  id: number;
  title: string;
  children?: MenuTreeItem[];
}

export const useMenuForm = () => {
  const formState = reactive<FormState>({
    parentId: null,
    name: '',
    path: '',
    title: '',
    icon: '',
    component: '',
    sort: 0,
    keepAlive: 0,
    hidden: 0,
  });
  const rules = reactive({
    name: [{ required: true, message: '请输入菜单名称' }],
    path: [{ required: true, message: '请输入路由地址' }],
    title: [{ required: true, message: '请输入菜单标题' }],
    component: [{ required: true, message: '请输入组件路径' }],
  });
  const useForm = Form.useForm;
  const { modelRef, ...menuForm } = useForm(formState, rules);

  // 父级菜单数据
  const getFormattedTreeData = (menuList: MenuListItem[]) => {
    const menuTree: MenuTreeItem[] = [];
    for (const menuItem of menuList) {
      const menuTreeItem: MenuTreeItem = {
        id: menuItem.id,
        title: (menuItem.meta?.title || menuItem.name) as string,
      };
      if (menuItem.children) {
        menuTreeItem.children = getFormattedTreeData(menuItem.children);
      }
      menuTree.push(menuTreeItem);
    }
    return menuTree;
  };

  // 编辑，设置表单
  const dataToFormState = (data: MenuListItem, formState: FormState) => {
    formState.parentId = data.parentId;
    formState.name = data.name;
    formState.path = data.path;
    formState.title = (data.meta?.title as string) || '';
    formState.icon = (data.meta?.icon as string) || '';
    formState.component = data.component;
    formState.sort = data.sort;
    formState.keepAlive = data.meta?.keepAlive ? 1 : 0;
    formState.hidden = data.meta?.hidden ? 1 : 0;
  };

  return {
    formState: modelRef as FormState,
    ...menuForm,
    getFormattedTreeData,
    dataToFormState,
  };
};
