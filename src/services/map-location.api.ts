import { IResponse } from '@/@type/responses';
import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const mapLocationApi = {
  createOrUpdateLocation: async (
    requestOption: IFormCreateOrUpdateLocation,
  ): Promise<IResponse> => {
    const url = 'secure/user-locations';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  getLastLocation: async (): Promise<IResponse> => {
    const url = 'secure/user-locations';
    return await axiosApiCall(url, Method.get);
  },
  getFriendNearUser: async (): Promise<IResponse> => {
    const url = 'secure/user-locations/friend-near-user';
    return await axiosApiCall(url, Method.get);
  },
};

export default mapLocationApi;
