// 统一接口返回数据格式
export const successResult = <T>(data: T, code = 0, message = 'success') => {
  return {
    code,
    data,
    message,
  };
};

export const errorResult = (message = 'fail', data = null, code = -1) => {
  return {
    code,
    data,
    message,
  };
};

// 返回分页数据
export const resultPageSuccess = <T = any>(
  list: T[],
  current: number | string,
  pageSize: number | string,
  message = 'success',
) => {
  current = +current;
  pageSize = +pageSize;
  const start = pageSize * (current - 1);
  const end = start + pageSize;
  return successResult(
    {
      list: list.slice(start, end),
      total: list.length,
      current,
      pageSize,
    },
    0,
    message,
  );
};

// 从请求获取 token
export const getRequestToken = ({ headers }: MockRequestParams): string | void => {
  const authorization = headers?.authorization;
  if (authorization && /^Bearer /.test(authorization)) {
    return authorization.slice(7);
  }
};
