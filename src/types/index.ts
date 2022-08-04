import { GenderEnum } from '@/types/enum';
export type Login = {
  phone: string;
};
export type LoginWithGoogle = {
  token: string;
};
export type UserContextData = {
  avatar: string;
  nickname: string;
  fullname: string;
  phone: string;
  email: string;
  gender: GenderEnum;
};
