import { get } from '@/utils/http';

// 查询表格
export const getTableList = (params: PaginationParams) =>
  get<ResponseListData<TableListItem>>('/list/getTableList', params);
