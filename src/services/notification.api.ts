import axiosApiCall from '@/utils/api';
import { Method } from '@/common/enums/enum';

const notificationApi = {
  getNotificationByUserId: async () => {
    const url = `secure/notifications`;
    return await axiosApiCall(url, Method.get);
  },
};

export default notificationApi;
