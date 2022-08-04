import { GenderEnum } from '@/types/enum';
export type RegisterContextType = {
  phone: string;
  email: string;
  fullname: string;
  nickname: string;
  gender: GenderEnum;
  avatar: string;
};
export type UserContextType = {
  registerForm: RegisterContextType;
  setRegisterForm: React.Dispatch<React.SetStateAction<RegisterContextType>>;
  submitRegister: (registerForm: RegisterContextType) => void;
  loginWithGoogle: (values: LoginGoogleContextType) => void;
};
export type LoginGoogleContextType = {
  token: string;
};
