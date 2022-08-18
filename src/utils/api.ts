import axios, { AxiosRequestConfig } from 'axios';
import { IResponse } from '../@type/responses';
import { getItemLocalStorage } from './storage';

const http = axios.create({
  headers: {
    'Content-type': `application/json;charset=UTF-8`,
  },
});

http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const { url } = config;
    config.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

    if (config.headers === undefined) {
      config.headers = {};
    } else if (url?.includes(`secure`)) {
      config.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYWQwNjUwNS1kZmE0LTQ5OTEtYTEyOS1hYTA0MDY5MzJiZTgiLCJwaG9uZSI6IjA3NjQwNzk5NzAiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDcxNzEwMSwiZXhwIjoxNjYwODAzNTAxfQ.XH01hO2yF8cSOVjUsbn5HwrG86tBdLovCuRTqQKD_-E`;

      // const token: string | undefined = getItemLocalStorage(`access-token`);
      // config.headers.authorization = token
      //   ? `Bearer ` + token
      //   : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYWQwNjUwNS1kZmE0LTQ5OTEtYTEyOS1hYTA0MDY5MzJiZTgiLCJwaG9uZSI6IjA3NjQwNzk5NzAiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDYzODU4OCwiZXhwIjoxNjYwNzI0OTg4fQ.tLsTuQoSbw2p1FmeWooBA63YZrMVTGk4lrPoBmahEns`;
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
