import { GenderEnum } from '@/types/enum';

export interface CreateUserDto {
  phone: string;
  email: string;
  nickname: string;
  fullname: string;
  gender: GenderEnum;
  otp: string;
}
