import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
import JsonWebToken from './JsonWebToken';

export default [
  // 获取“查询表格”数据
  {
    url: '/api/tableList',
    method: 'get',
    timeout: 500,
    response: ({
      query,
      headers
    }: MockRequestOptions): BaseResponse<ResponseList<TableListItem> | null> => {
      const current = query.current ? +query.current : 1;
      const pageSize = query.pageSize ? +query.pageSize : 10;

      const data = Mock.mock({
        [`list|${pageSize}`]: [
          {
            'id|+1': (current - 1) * pageSize + 1,
            desc: '@csentence',
            status: '@integer(0, 1)',
            updatedAt: '@datetime("yyyy-MM-dd HH:mm:ss")'
          }
        ]
      });

      return JsonWebToken.getAuthData<ResponseList<TableListItem>>(
        headers.authorization,
        {
          list: data.list,
          total: 100,
          pageSize: 10,
          current: 1
        }
      );
    }
  }
] as MockMethod[];
