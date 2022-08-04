import { LoginWithGoogle } from '@/types';
import { Method } from '@/types/enum';
import { axiosApiCall } from '@/utils';

export const loginGoogle = async (data: LoginWithGoogle) => {
  return await axiosApiCall(`auth/login-google`, Method.post, data);
};
