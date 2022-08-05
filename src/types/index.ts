export type Login = {
  phone: string;
};
export type LoginWithGoogle = {
  token: string;
};
export type ResponseType<T> = {
  code: number;
  data: null | string | T | T[];
  message: string;
  error: string;
};

export type LoginWithOtp = {
  phone: string;
  code: string;
};
