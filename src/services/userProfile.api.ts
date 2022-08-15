import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const UserProfileApi = {
  getInfo: async () => {
    const url = '/users/private/user-profile';
    return await axiosApiCall(url, Method.get);
  },
};

export default UserProfileApi;
