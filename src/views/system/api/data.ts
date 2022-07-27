import type { TableColumnsType } from 'ant-design-vue';

export const columns: TableColumnsType = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'API路径',
    dataIndex: 'path',
  },
  {
    title: 'API分组',
    dataIndex: 'group',
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
  {
    title: 'method',
    dataIndex: 'method',
  },
  {
    title: '操作',
    dataIndex: 'action',
  },
];

// 表单布局
export const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

// method 选项
export const methodOptions = [
  { value: 'get' },
  { value: 'post' },
  { value: 'put' },
  { value: 'delete' },
];
