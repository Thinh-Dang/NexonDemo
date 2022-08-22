import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserProfileApi from '@/services/userProfile.api';
import {
  IChangeFavoriteImage,
  ICreateHobby,
  IDeleteHobby,
  IUpdateUserProfile,
  IUploadImages,
} from '@/@type/services';
import { IResponse } from '@/@type/responses';
import { IUserHobbies, IUserImages } from '@/@type/params';

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
export const uploadImages = createAsyncThunk(
  '/users/upload-images',
  async (dto: FormData) => {
    const res = await UserProfileApi.uploadImages(dto);

    return res;
  },
);
export const changeFavoriteImage = createAsyncThunk(
  '/users/change-favorite-image',
  async (data: IChangeFavoriteImage) => {
    const res = await UserProfileApi.changeFavoriteImage(data);

    return res;
  },
);
export const deleteImage = createAsyncThunk(
  '/users/delete-image',
  async (data: IChangeFavoriteImage) => {
    const res = await UserProfileApi.deleteImage(data);

    return res;
  },
);
export const updateSimpleInfo = createAsyncThunk(
  'users/update-simple-info',
  async (dto: FormData) => {
    const res = await UserProfileApi.updateSimpleInfo(dto);

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
    builder.addCase(
      uploadImages.fulfilled,
      (
        state: IUserProfile,
        action: PayloadAction<IResponse<string | IUserImages[]>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload as IResponse<IUserImages[]>;
          state.album = res.data as IUserImages[];
        }
      },
    );
    builder.addCase(
      changeFavoriteImage.fulfilled,
      (
        state: IUserProfile,
        action: PayloadAction<IResponse<string | IUserImages>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as IUserImages;

          for (let i = 0; i < state.album.length; i++) {
            if (state.album[i].id === res.id) {
              state.album[i].isFavorite = res.isFavorite;
              break;
            }
          }
        }
      },
    );
    builder.addCase(
      deleteImage.fulfilled,
      (state: IUserProfile, action: PayloadAction<IResponse<string>>) => {
        if (action.payload.status) {
          const res = action.payload.data as string;

          const index = state.album.findIndex(
            (image: IUserImages) => image.id === res,
          );

          state.album.splice(index, 1);
        }
      },
    );
    builder.addCase(
      updateSimpleInfo.fulfilled,
      (
        state: IUserProfile,
        action: PayloadAction<IResponse<string | IUserProfile>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as IUserProfile;

          state.avatar = res.avatar;
          state.birthday = new Date(res.birthday);
          state.name = res.name;
        }
      },
    );
  },
  reducers: {},
});

const { reducer, actions } = userProfileSlice;
export const {} = actions;
export default reducer;
