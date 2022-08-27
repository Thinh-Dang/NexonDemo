import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '@/services/user.api';
import { ICheckUserVerified, ISignInWithSocial } from '@/@type/services';
import { PLEASE_TRY_AGAIN_AFTER_5_MINUES } from '@/common/constantArlertErrors';
import { message } from 'antd';
import {
  IFormEnterPhonePage,
  IFormOtpPage,
  IFormRegisterPage,
} from '@/@type/page';

export const callAPISendOTP = createAsyncThunk(
  'otp/send-otp',
  async (requestOption: IFormEnterPhonePage) => {
    return await userApi.sendOTP(requestOption).then((res) => res);
  },
);

export const callAPIVerifyCode = createAsyncThunk(
  'otp/verify-otp',
  async (requestOption: IFormOtpPage) => {
    return await userApi.verifyOTP(requestOption).then((res) => res);
  },
);

export const callAPIVerifyCodeLoginWithSocial = createAsyncThunk(
  'verify-otp-social',
  async (requestOption: IFormOtpPage) => {
    return await userApi.verifyOTPWithSocial(requestOption).then((res) => res);
  },
);

export const callAPIUpdateUser = createAsyncThunk(
  'users/update-dream-team',
  async (requestOption: IFormRegisterPage) => {
    return await userApi
      .createUserWithPhoneNumber(requestOption)
      .then((res) => res);
  },
);

export const callApiSignUpWithSocial = createAsyncThunk(
  'users/signup',
  async (requestOption: ISignInWithSocial) => {
    return await userApi.signUpUserWithSocial(requestOption).then((res) => res);
  },
);

export const getProfile = createAsyncThunk('auth/profile', async () => {
  return await userApi.getProfile().then((res) => res);
});

export const checkUserVerified = createAsyncThunk(
  'otp/user-verified',
  async (requestOption: ICheckUserVerified) => {
    return await userApi.checkUserVerified(requestOption).then((res) => res);
  },
);
const initialState: IInitialStateUser = {
  isLogin: false,
  id: '',
  inforUser: {
    name: '',
    email: '',
    birthday: '',
    gender: '',
  },
  isEmailVerify: false,
  phone: '',
  step: 0,
  stateSession: '',
  isHeader: true,
  isValidOtp: false,
  isValidOtpWhenEmailVerify: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.isValidOtp = false;
      state.isLoading = false;
      state.isEmailVerify && state.step === 3
        ? ((state.step = 1), (state.isEmailVerify = false))
        : '';

      state.phone = '';
      state.step === 1 ? (state.step = 0) : (state.step = state.step - 1);
    },

    addPhoneNumber: (state, action) => {
      state.phone = action.payload.phone;
    },

    setIsSocial: (state, action) => {
      state.stateSession = action.payload;
    },
    setStepLoginWithSocial: (state) => {
      state.step = 3;
    },
    setStepLogin: (state) => {
      state.step += 1;
    },
    setIsValidOtp: (state) => {
      state.isValidOtp = true;
    },
    resetLogin: (state) => {
      state.isLogin = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(callAPIVerifyCode.fulfilled, (state, action) => {
      if (action.payload.status) {
        if (action.payload.data === null) {
          state.step += 1;
          state.isHeader = false;
        } else {
          localStorage.setItem('token', action.payload.data);
          state.isLogin = true;
        }
      }
    });

    builder.addCase(callAPIUpdateUser.fulfilled, (state, action) => {
      if (action.payload.status) {
        localStorage.setItem('token', action.payload.data.token);
        state.isLogin = true;
      }
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.isLogin = true;
        state.id = action.payload.data.id;
      }
    });

    builder.addCase(getProfile.rejected, (state) => {
      state.isLogin = false;
      state.id = '';
    });

    builder.addCase(callApiSignUpWithSocial.fulfilled, (state, action) => {
      state.inforUser.email = action.payload?.data?.email;
    });

    builder.addCase(
      callAPIVerifyCodeLoginWithSocial.fulfilled,
      (state, action) => {
        if (action.payload.status) {
          state.isLogin = true;
          localStorage.setItem('token', action.payload.data);
        }
      },
    );

    builder.addCase(checkUserVerified.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.phone = action.payload.data;
        state.isEmailVerify = true;
        state.step = 3;
        message.success('Vui lòng nhập OTP đã được gửi');
      } else if (
        !action.payload.status &&
        action.payload.message === PLEASE_TRY_AGAIN_AFTER_5_MINUES
      ) {
        state.isEmailVerify = true;
        state.isValidOtpWhenEmailVerify = true;
        state.step = 3;
        message.error('Vui lòng thử lai sau 5 phút');
      } else {
        state.step = 1;
      }
    });
  },
});

const { reducer, actions } = userSlice;
export const {
  resetState,
  addPhoneNumber,
  setIsSocial,
  setStepLoginWithSocial,
  setStepLogin,
  setIsValidOtp,
  resetLogin,
  setLoading,
} = actions;
export default reducer;
