import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const url = `secure/settings`;

const settingsApi = {
  getRadius: async () => {
    return await axiosApiCall(url, Method.get);
  },
};
export default settingsApi;
