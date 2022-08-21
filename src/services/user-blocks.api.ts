import { IResponse } from '@/@type/responses';
import { IUserBlock } from '@/@type/services';
import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const userBlocksApi = {
  createUserBlock: async (
    requestOption: IFormCreateUserBlock,
  ): Promise<IResponse<IUserBlock>> => {
    return await axiosApiCall('secure/user-blocks', Method.post, requestOption);
  },
};
export default userBlocksApi;
