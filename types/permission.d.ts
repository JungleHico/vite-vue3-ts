declare type Permission = {
  id: number;
  key: string;
  name: string;
  actions: string[];
};

declare type MenuItem = {
  id: number;
  name: string;
  path: string;
  icon: string;
  hidden: boolean;
  parentId: number;
  children?: MenuItem[];
};

declare type Role = {
  id: number;
  name: string;
  desc: string;
  permissions: Permission[];
};
