declare type Action = 'create' | 'edit';

declare type Pagination = {
  current: number;
  pageSize: number;
  total: number;
};

declare type TableSize = 'default' | 'middle' | 'small';
