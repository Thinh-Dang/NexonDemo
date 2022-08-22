import { IResponse } from '@/@type/responses';
import { IUserLikeStack } from '@/@type/services';
import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const userLikeStacksApi = {
  createUserLikeStack: async (
    requestOption: IFormCreateUserLikeStack,
  ): Promise<IResponse<IUserLikeStack>> => {
    return await axiosApiCall(
      'secure/user-like-stacks',
      Method.post,
      requestOption,
    );
  },
};
export default userLikeStacksApi;
