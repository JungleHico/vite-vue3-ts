import dayjs, { Dayjs } from 'dayjs';

// 格式化数字输入框（正整数）
export const integerFormatter = (value: string) => {
  return value.replaceAll(/[^0-9]/g, '');
};

// 日期不能早于今天
export const disableDateBeforeDay = (current: Dayjs) => {
  return current && current < dayjs().startOf('day');
};

// 验证手机号码
export const checkPhoneNumber = (phone: string): boolean => {
  return /^1[3-9][0-9]{9}$/.test(phone);
};
