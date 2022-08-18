import axios, { AxiosRequestConfig } from 'axios';
import { IResponse } from '../@type/responses';
import { getItemLocalStorage } from './storage';

const http = axios.create({
  headers: {
    'Content-type': `application/json;charset=UTF-8`,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YWFjMjI4Zi0wNmY2LTQzMTMtOTM5My05ZDM3NzcyZWM0MjQiLCJwaG9uZSI6IjA5ODc2NTQzMjEiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDc5NzcwMCwiZXhwIjoxNjYwODg0MTAwfQ.vtnwfYJS2g2BZru8cYXLWM_X354s5ec7COc-dsJFMuo`,
  },
});

http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const { url } = config;
    config.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;
    if (config.headers === undefined) {
      config.headers = {};
    } else if (url?.includes(`secure`)) {
      const token: string | undefined = getItemLocalStorage(`access-token`);
      config.headers.authorization = token ? `Bearer ` + token : ``;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return {
      status: false,
      error: error,
      data: null,
      message: null,
    } as IResponse;
  },
);

http.interceptors.response.use(
  function (response) {
    return response.data as IResponse;
  },
  function (error) {
    console.log(error);
    return {
      status: false,
      error: error,
      data: null,
      message: null,
    } as IResponse;
  },
);

const axiosApiCall = async <T = any>(
  url: string,
  method: string,
  body = {},
): Promise<IResponse> => {
  return http.request<T, IResponse>({
    method,
    url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
    data: body,
  });
};

export default axiosApiCall;
