import http from '@/utils/http';

export const getTableList = (params?: any) =>
  http.get<ResponseList<TableListItem>>(
    '/api/tableList',
    params ? { params } : {}
  );
