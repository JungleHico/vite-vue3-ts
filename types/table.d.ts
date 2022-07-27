declare interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

declare type TableSize = 'default' | 'middle' | 'small';

declare type TableAction = 'create' | 'edit';
