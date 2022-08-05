import { GenderEnum } from '@/types/enum';

export interface CreateUserDto {
  phone: string;
  email: string;
  nickName: string;
  fullName: string;
  gender: GenderEnum;
  otp: string;
}
