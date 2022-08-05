import { LoginWithGoogle, LoginWithOtp } from '@/types';
import { Method } from '@/types/enum';
import { axiosApiCall } from '@/utils';

export const loginGoogle = async (data: LoginWithGoogle) => {
  return await axiosApiCall(`auth/login-google`, Method.post, data);
};

export const loginOtp = async (data: LoginWithOtp) => {
  return await axiosApiCall(`auth/otp-login`, Method.post, data);
};
