// 定义接口返回数据格式
declare interface HttpResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 约束返回列表数据（分页信息）
declare interface ResponseListData<T> {
  list: T[];
  total: number;
  pageSize: number;
  current: number;
}

// 请求分页参数
declare interface PaginationParams {
  current?: number;
  pageSize?: number;
}

// 定义 Mock 请求参数
declare interface MockRequestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}
