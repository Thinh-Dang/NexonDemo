import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userApi from '@/services/user.api';

export const checkOtp = createAsyncThunk(
  '/otp/verify-otp',
  async (requestOption: IFormOtpPage) => {
    return await userApi.checkOtp(requestOption).then((res) => res);
  },
);

export const register = createAsyncThunk(
  '/auth/register',
  async (requestOption: IFormRegisterPage) => {
    return await userApi.register(requestOption).then((res) => res);
  },
);

export const loginSocial = createAsyncThunk(
  '/auth/login-social',
  async (requestOption: ILoginWithSocialPage) => {
    return await userApi.loginSocial(requestOption).then((res) => res);
  },
);

const initialState: IInitialStateUser = {
  isVerifyOtp: false,
  isLogin: false,
  isSocial: false,
  name: '',
  email: '',
  phone: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    enterPhone(state, action: PayloadAction<IFormEnterPhonePage>) {
      state.phone = action.payload.phone;
      userApi.getOtp({ phone: action.payload.phone });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      checkOtp.fulfilled,
      (state: IInitialStateUser, action: any) => {
        if (action.payload) {
          state.isVerifyOtp = true;
          localStorage.setItem('jwt', action.payload.token);
        }
      },
    );
    builder.addCase(
      register.fulfilled,
      (state: IInitialStateUser, action: any) => {
        if (action.payload) {
          state.isLogin = true;
          localStorage.setItem('jwt', action.payload);
        }
      },
    );
    builder.addCase(
      loginSocial.fulfilled,
      (state: IInitialStateUser, action: any) => {
        if (action.payload.code === 200) {
          state.isSocial = true;
          state.email = action.payload.email;
          state.name = action.payload.name;
        }
      },
    );
  },
});

const { reducer, actions } = userSlice;
export const { enterPhone } = actions;
export default reducer;
