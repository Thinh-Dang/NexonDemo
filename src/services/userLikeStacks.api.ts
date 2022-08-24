import {
  IFormCreateUserLikeStack,
  IFormDeleteUserLikeStack,
} from '@/@type/page';
import { IResponse } from '@/@type/responses';
import { IUserLikeStack } from '@/@type/services';
import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const url = 'secure/user-like-stacks';
const userLikeStacksApi = {
  createUserLikeStack: async (
    requestOption: IFormCreateUserLikeStack,
  ): Promise<IResponse<IUserLikeStack>> => {
    return await axiosApiCall(url, Method.post, requestOption);
  },

  getMatchingFriends: async () => {
    return await axiosApiCall(`${url}/matching-friends`, Method.get);
  },

  deleteUserLikeStacks: async (requestOption: IFormDeleteUserLikeStack) => {
    return await axiosApiCall(`${url}`, Method.delete, requestOption);
  },
};
export default userLikeStacksApi;
