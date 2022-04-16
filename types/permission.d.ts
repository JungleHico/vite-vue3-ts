declare type Permission = {
  id: number;
  key: string;
  name: string;
  actions: string[];
};

declare type Role = {
  id: number;
  name: string;
  desc: string;
  permissions: Permission[];
};
