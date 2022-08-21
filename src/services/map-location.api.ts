import { IResponse } from '@/@type/responses';
import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const mapLocationApi = {
  createOrUpdateLocation: async (
    requestOption: IFormCreateOrUpdateLocation,
  ): Promise<IResponse> => {
    return await axiosApiCall(
      'secure/user-locations',
      Method.post,
      requestOption,
    );
  },
  getLastLocation: async (): Promise<IResponse> => {
    return await axiosApiCall('secure/user-locations', Method.get);
  },
  getFriendNearUser: async (): Promise<IResponse> => {
    return await axiosApiCall(
      'secure/user-locations/friend-near-user',
      Method.get,
    );
  },
};

export default mapLocationApi;
