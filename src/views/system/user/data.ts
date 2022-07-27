import type { TableColumnsType } from 'ant-design-vue';

export const columns: TableColumnsType = [
  {
    title: '用户ID',
    dataIndex: 'userId',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '角色',
    dataIndex: 'roles',
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 150,
  },
];

// 表单布局
export const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
