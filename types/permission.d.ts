declare type Api = {
  id: number;
  path: string;
  desc: string;
  method: string;
  group: string;
};

declare type MenuItem = {
  id: number;
  parentId: number;
  name: string;
  path: string;
  redirect?: string;
  meta: { title: string; icon: string; hidden: boolean };
  component: string;
  children?: MenuItem[];
};

declare type Role = {
  id: number;
  name: string;
  desc: string;
};

declare type User = {
  id: number;
  account: string;
  username: string;
  avatar: string;
  phone: string;
  roles: string[];
};
