export type Login = {
  phone: string;
};

export type LoginWithGoogle = {
  token: string;
};
export type ResponsesType<T> = {
  code: number;
  data: null | string | T | T[];
  message: string;
  error: string;
};
export type VerifyUserByEmailType = {
  email: string;
};
