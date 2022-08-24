import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userApi from '@/services/user.api';
import { IInitialStateUser } from '@/@type/redux';
import { ISignInWithSocial } from '@/@type/services';
import { IFormRegisterPage } from '@/@type/page';

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

const initialState: IInitialStateUser = {
  isStatusApi: false,
  isLogin: false,
  isSocial: false,
  isVerifyOtp: false,
  inforUser: {
    name: '',
    email: '',
    birthday: '',
    gender: '',
  },
  phone: '',
  isGetPhone: false,
  session: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  // reducers: {
  //   enterPhone(state, action: PayloadAction<IFormEnterPhonePage>) {
  //     state.phone = action.payload.phone;
  //     userApi.getOtp({ phone: action.payload.phone });
  //   },
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(
  //     checkOtp.fulfilled,
  //     (state: IInitialStateUser, action: any) => {
  //       if (action.payload) {
  //         state.isVerifyOtp = true;
  //         localStorage.setItem('jwt', action.payload.token);
  //       }
  //     },
  //   );
  //   builder.addCase(
  //     register.fulfilled,
  //     (state: IInitialStateUser, action: any) => {
  //       if (action.payload) {
  //         state.isLogin = true;
  //         localStorage.setItem('jwt', action.payload);
  //       }
  //     },
  //   );
  //   builder.addCase(
  //     loginSocial.fulfilled,
  //     (state: IInitialStateUser, action: any) => {
  //       if (action.payload.code === 200) {
  //         state.isSocial = true;
  //         state.email = action.payload.email;
  //         state.name = action.payload.name;
  //       }
  //     },
  //   );
  // },
  reducers: {
    resetIsGetPhone: (state) => {
      state.isGetPhone = false;
      state.isVerifyOtp = false;
      state.phone = '';
    },
    addPhoneNumber: (state, action) => {
      state.phone = action.payload.phone;
    },
    setIsSocial: (state) => {
      state.isSocial = true;
      state.isVerifyOtp = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(callAPISendOTP.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.isStatusApi = true;
        state.isGetPhone = true;
      }
    });

    builder.addCase(callAPIVerifyCode.fulfilled, (state, action) => {
      if (action.payload.status) {
        if (action.payload.data === null) {
          state.isVerifyOtp = true;
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
      }
    });

    builder.addCase(getProfile.rejected, (state) => {
      state.isLogin = false;
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
  },
});

const { reducer, actions } = userSlice;
export const { resetIsGetPhone, addPhoneNumber, setIsSocial } = actions;
export default reducer;
