import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userApi from '@/services/user.api';

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
        state.isVerifyOtp = true;
      }
    });
  },
});

const { reducer, actions } = userSlice;
export const { resetIsGetPhone, addPhoneNumber } = actions;
export default reducer;
