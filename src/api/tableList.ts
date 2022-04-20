import http from '@/utils/http';

export const getTableList = (params: PaginationParams) =>
  http.get<ResponseList<TableListItem>>('/api/tableList', { params });
