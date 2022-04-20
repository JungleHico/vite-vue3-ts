import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

export default [
  // 获取“查询表格”数据
  {
    url: '/api/tableList',
    method: 'get',
    timeout: 500,
    response: ({
      query
    }: MockRequestOptions): BaseResponse<ResponseList<TableListItem>> => {
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

      return {
        code: 0,
        data: {
          list: data.list,
          total: 100,
          pageSize: 10,
          current: 1
        },
        message: 'success'
      };
    }
  }
] as MockMethod[];
