import { IPurpose } from '@/@type/params';
import { IResponse } from '@/@type/responses';
import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const PurposeApi = {
  getPurposes: async () => {
    const url = 'purpose-settings';
    return (await axiosApiCall(url, Method.get)) as IResponse<
      string | IPurpose[]
    >;
  },
};

export default PurposeApi;
