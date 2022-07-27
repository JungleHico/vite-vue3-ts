export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
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
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
