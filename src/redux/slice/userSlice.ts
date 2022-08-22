import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
export const callAPIUpdateUser = createAsyncThunk(
  'users/update-dream-team',
  async (requestOption: IFormRegisterPage) => {
    return await userApi
      .createUserWithPhoneNumber(requestOption)
      .then((res) => res);
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
    id: '',
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
        console.log(action.payload);
      }
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.isLogin = true;
        state.inforUser.id = action.payload.data.id;
      }
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.isLogin = false;
      state.inforUser.id = '';
    });
  },
});

const { reducer, actions } = userSlice;
export const { resetIsGetPhone, addPhoneNumber } = actions;
export default reducer;
