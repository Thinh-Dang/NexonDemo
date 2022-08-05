import { Method } from '@/types/enum';
import { Register } from '@/types/user.type';
import { axiosApiCall } from '@/utils';

export const register = async (data: Register) => {
  return await axiosApiCall(`users/signup`, Method.post, data);
};
