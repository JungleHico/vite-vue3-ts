import { get } from '@/utils/http';
import { MenuItem } from '../../types/permission';

export const getMenu = () => get<MenuItem[]>('/menu/getMenu');
