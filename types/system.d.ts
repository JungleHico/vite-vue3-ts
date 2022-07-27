import { MenuItem } from './permission';

declare global {
  declare interface Role {
    id: number;
    value: string;
    name: string;
    remark: string;
  }

  declare interface User {
    userId: number;
    username: string;
    nickname: string;
    phone: string;
    roles: string[];
    avatar: string;
  }

  declare interface MenuListItem extends MenuItem {
    id: number;
    sort: number;
    parentId: number | null;
    children?: MenuListItem[];
  }

  declare interface Api {
    id: number;
    path: string;
    group: string;
    desc: string;
    method: string;
  }
}
