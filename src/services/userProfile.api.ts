import { IUserHobbies, IUserImages } from '@/@type/params';
import { IResponse } from '@/@type/responses';
import {
  IChangeFavoriteImage,
  ICreateHobby,
  IDeleteHobby,
  IUpdateUserProfile,
} from '@/@type/services';
import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const UserProfileApi = {
  getInfo: async (): Promise<IResponse<string | IUserProfile>> => {
    const url = 'secure/users/user-profile';
    return (await axiosApiCall(url, Method.get)) as IResponse<
      string | IUserProfile
    >;
  },
  updateInfo: async (
    dto: IUpdateUserProfile,
  ): Promise<IResponse<string | IUserProfile>> => {
    const url = 'secure/users/update';
    const res = (await axiosApiCall(url, Method.put, dto)) as IResponse<
      string | IUserProfile
    >;

    return res;
  },
  createUserHobby: async (
    dto: ICreateHobby,
  ): Promise<IResponse<IUserHobbies | string>> => {
    const url = 'secure/users/hobbies';
    const res = (await axiosApiCall(url, Method.post, dto)) as IResponse<
      IUserHobbies | string
    >;

    return res;
  },
  deleteUserHobby: async (dto: IDeleteHobby): Promise<IResponse<string>> => {
    const url = 'secure/users/hobbies';
    const res = (await axiosApiCall(
      url,
      Method.delete,
      dto,
    )) as IResponse<string>;
    return res;
  },
  uploadImages: async (
    data: FormData,
  ): Promise<IResponse<string | IUserImages[]>> => {
    const url = 'secure/users/upload-images';
    const res = (await axiosApiCall(url, Method.post, data, true)) as IResponse<
      string | IUserImages[]
    >;
    return res;
  },
  changeFavoriteImage: async (
    data: IChangeFavoriteImage,
  ): Promise<IResponse<string | IUserImages>> => {
    const url = 'secure/users/change-image-favorite';
    const res = (await axiosApiCall(url, Method.post, data)) as IResponse<
      string | IUserImages
    >;
    return res;
  },
  deleteImage: async (
    data: IChangeFavoriteImage,
  ): Promise<IResponse<string>> => {
    const url = 'secure/users/delete-image';
    const res = (await axiosApiCall(
      url,
      Method.delete,
      data,
    )) as IResponse<string>;
    return res;
  },
  updateSimpleInfo: async (
    dto: FormData,
  ): Promise<IResponse<string | IUserProfile>> => {
    const url = 'secure/users/update';

    const res = (await axiosApiCall(url, Method.put, dto, true)) as IResponse<
      string | IUserProfile
    >;

    return res;
  },
};

export default UserProfileApi;
