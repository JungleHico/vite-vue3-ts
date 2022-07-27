import type { TableColumnsType } from 'ant-design-vue';

export const columns: TableColumnsType = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '角色值',
    dataIndex: 'value',
  },
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 240,
  },
];
