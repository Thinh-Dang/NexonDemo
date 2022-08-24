import {
  IFormEnterPhonePage,
  IFormOtpPage,
  IFormRegisterPage,
} from '@/@type/page';
import { ICheckUserVerified, ISignInWithSocial } from '@/@type/services';
import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const userApi = {
  sendOTP: async (requestOption: IFormEnterPhonePage) => {
    const url = 'otp/send-otp';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  verifyOTP: async (requestOption: IFormOtpPage) => {
    const url = 'otp/verify-otp';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  createUserWithPhoneNumber: async (requestOption: IFormRegisterPage) => {
    const url = 'users/update-dream-team';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  getProfile: async () => {
    const url = 'secure/auth/profile';
    return await axiosApiCall(url, Method.get);
  },
  signUpUserWithSocial: async (requestOption: ISignInWithSocial) => {
    const url = 'users/signup';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  verifyOTPWithSocial: async (requestOption: IFormOtpPage) => {
    const url = 'otp/verify-otp-social';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  checkUserVerified: async (requestOption: ICheckUserVerified) => {
    const url = 'otp/user-verified';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  getFriendProfle: async (id: string) => {
    return await axiosApiCall(`users/secure/friend-profile/${id}`, Method.get);
  },
};

export default userApi;
