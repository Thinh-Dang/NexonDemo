import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserProfileApi from '@/services/userProfile.api';
import {
  ICreateHobby,
  IDeleteHobby,
  IUpdateUserProfile,
} from '@/@type/services';
import { IResponse } from '@/@type/responses';
import { IUserHobbies } from '@/@type/params';

export const getUserProfile = createAsyncThunk('/users/profile', async () => {
  return await UserProfileApi.getInfo();
});
export const updateUserProfile = createAsyncThunk(
  '/users/update-profile',
  async (dto: IUpdateUserProfile) => {
    const res = await UserProfileApi.updateInfo(dto);
    return res;
  },
);
export const createUserHobby = createAsyncThunk(
  '/users/create-hobby',
  async (value: ICreateHobby) => {
    const res = await UserProfileApi.createUserHobby(value);

    return res;
  },
);
export const deleteUserHobby = createAsyncThunk(
  '/users/delete-hobby',
  async (dto: IDeleteHobby) => {
    const res = await UserProfileApi.deleteUserHobby(dto);

    return res;
  },
);

const initialState: IUserProfile = {
  id: '',
  name: '',
  avatar: '',
  email: '',
  phone: '',
  birthday: new Date(),
  gender: '',
  description: '',
  children: 0,
  height: 170,
  maritalStatus: '',
  alcohol: '',
  religion: '',
  education: '',
  purposeId: '',
  isBlock: false,
  isVerify: false,
  album: [],
  hobbies: [],
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(
      getUserProfile.fulfilled,
      (
        state: IUserProfile,
        action: PayloadAction<IResponse<string | IUserProfile>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data;

          const keys = Object.keys(state);
          keys.forEach((element) => {
            state[element] = res[element];
            if (element === 'birthday') state[element] = new Date(res[element]);
            else {
              state[element] = res[element];
            }
          });
        }
      },
    );
    builder.addCase(
      updateUserProfile.fulfilled,
      (
        state: IUserProfile,
        action: PayloadAction<IResponse<string | IUserProfile>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data;

          const keys = Object.keys(state);
          keys.forEach((element) => {
            if (element !== 'type') {
              if (element === 'birthday')
                state[element] = new Date(res[element]);
              else {
                state[element] = res[element];
              }
            }
          });
        }
      },
    );
    builder.addCase(
      createUserHobby.fulfilled,
      (
        state: IUserProfile,
        action: PayloadAction<IResponse<IUserHobbies | string>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as IUserHobbies;
          state.hobbies.push(res);
        }
      },
    );
    builder.addCase(
      deleteUserHobby.fulfilled,
      (state: IUserProfile, action: PayloadAction<IResponse<string>>) => {
        if (action.payload.status) {
          const res = action.payload.data as string;
          const index = state.hobbies.findIndex(
            (item: IUserHobbies) => item.id === res,
          );
          state.hobbies.splice(index, 1);
        }
      },
    );
  },
  reducers: {},
});

const { reducer, actions } = userProfileSlice;
export const {} = actions;
export default reducer;
