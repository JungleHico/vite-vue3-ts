import { Recordable } from 'vite-plugin-mock';

declare global {
  // 约束响应数据
  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
  };

  // 定义返回数组的类型
  type ResponseList<T> = {
    list: T[];
    total: number;
    pageSize: number;
    current: number;
  };

  // Mock请求参数格式
  type MockRequestOptions = {
    url: Recordable;
    body: Recordable;
    query: Recordable;
    headers: Recordable;
  };
}
export {};
