import { IUserHobbies } from '@/@type/params';
import { IResponse } from '@/@type/responses';
import {
  ICreateHobby,
  IDeleteHobby,
  IUpdateUserProfile,
} from '@/@type/services';
import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const UserProfileApi = {
  getInfo: async (): Promise<IResponse<string | IUserProfile>> => {
    const url = 'users/secure/user-profile';
    return (await axiosApiCall(url, Method.get)) as IResponse<
      string | IUserProfile
    >;
  },
  updateInfo: async (dto: IUpdateUserProfile): Promise<IResponse<string>> => {
    const url = 'users/secure/update';
    const res = (await axiosApiCall(url, Method.put, dto)) as IResponse<string>;

    return res;
  },
  createUserHobby: async (
    dto: ICreateHobby,
  ): Promise<IResponse<IUserHobbies | string>> => {
    const url = 'users/secure/hobbies';
    const res = (await axiosApiCall(url, Method.post, dto)) as IResponse<
      IUserHobbies | string
    >;

    return res;
  },
  deleteUserHobby: async (dto: IDeleteHobby): Promise<IResponse<string>> => {
    const url = 'users/secure/hobbies';
    const res = (await axiosApiCall(
      url,
      Method.delete,
      dto,
    )) as IResponse<string>;
    return res;
  },
};

export default UserProfileApi;
