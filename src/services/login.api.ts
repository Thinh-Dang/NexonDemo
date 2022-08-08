import { IResponse } from '@/@type/interface/response';
import { LoginWithGoogle, LoginWithOtp, VerifyUserByEmailType } from '@/types';
import { Method } from '@/types/enum';
import axiosApiCall from '@/utils/api';

export const loginGoogle = async (
  data: LoginWithGoogle,
): Promise<IResponse> => {
  return await axiosApiCall(`auth/login-google`, Method.post, data);
};

export const loginOtp = async (data: LoginWithOtp): Promise<IResponse> => {
  return await axiosApiCall(`auth/otp-login`, Method.post, data);
};
export const verifyUserByEmail = async (
  data: VerifyUserByEmailType,
): Promise<IResponse> => {
  return await axiosApiCall(`users/verify-user-by-email`, Method.post, data);
};
