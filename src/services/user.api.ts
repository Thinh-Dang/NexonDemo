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
};

export default userApi;
