import { LoginWithGoogle, VerifyUserByEmailType } from '@/types';
import { Method } from '@/types/enum';
import { axiosApiCall } from '@/utils';

export const loginGoogle = async (data: LoginWithGoogle) => {
  return await axiosApiCall(`auth/login-google`, Method.post, data);
};
export const verifyUserByEmail = async (data: VerifyUserByEmailType) => {
  return await axiosApiCall(`users/verify-user-by-email`, Method.post, data);
};
