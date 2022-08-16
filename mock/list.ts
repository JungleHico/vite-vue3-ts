import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, errorResult, getRequestToken } from './utils';

function getTableList() {
  const tableList = [];
  for (let i = 0; i < 100; i++) {
    tableList.push({
      id: i + 1,
      desc: '@csentence',
      status: '@integer(0, 1)',
      updatedAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
    });
  }
  return tableList;
}

const listServices: MockMethod[] = [
  {
    url: '/list/getTableList',
    timeout: 500,
    method: 'get',
    response: (request: MockRequestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return errorResult('无效token', null, 401);
      }
      const { query } = request;
      const { current = 1, pageSize = 10 } = query;
      return resultPageSuccess(getTableList(), current, pageSize);
    },
  },
];

export default listServices;
