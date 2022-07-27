import type { TableColumnsType } from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue';

interface Option {
  value: string;
}

export const columns: TableColumnsType = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '菜单标题',
    dataIndex: 'title',
    width: 128,
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    width: 200,
  },
  {
    title: '路由Name',
    dataIndex: 'name',
    width: 128,
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 200,
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    width: 200,
  },
  {
    title: '排序值',
    dataIndex: 'sort',
  },
  {
    title: '是否缓存',
    dataIndex: 'keepAlive',
  },
  {
    title: '是否隐藏',
    dataIndex: 'hidden',
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 240,
  },
];

// 表单布局
export const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

// 图标列表
export const iconOptions = Object.keys(Icons).map((iconName: string) => ({
  value: iconName,
}));
// 图标搜索
export const iconFilterOption = (input: string, option: Option) => {
  return option.value.toUpperCase().includes(input.toUpperCase());
};

// 父级菜单树形选择器自定义字段
export const menuTreeFieldNames = {
  children: 'children',
  label: 'title',
  // key: 'id',
  value: 'id',
};
