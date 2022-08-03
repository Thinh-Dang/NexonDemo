import axios from 'axios';

export const axiosApiCall = (url: string, method: string, body = {}) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
    data: body,
  });
