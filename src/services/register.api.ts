import { IResponse } from '@/@type/interface/response';
import { Method } from '@/types/enum';
import { Register } from '@/types/user.type';
import axiosApiCall from '@/utils/api';

export const register = async (data: Register): Promise<IResponse> => {
  return await axiosApiCall(`users/signup`, Method.post, data);
};
