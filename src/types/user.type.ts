import { GenderEnum } from './enum';

export type LoginGoogleContextType = {
  token: string;
};

export type Register = {
  phone: string;
  email: string;
  fullname: string;
  nickname: string;
  gender?: GenderEnum;
  avatar: string;
  otp: string;
};

export type UserProviderData = {
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type VerifyResponseType = {
  isNewUser: boolean;
};

export type RegisterResponseType = {
  token: string;
};
export type UserContextType = {
  registerForm: Register;
  userInfoForm: Register;
  verifyUser: (values: UserProviderData) => Promise<VerifyResponseType>;
  setRegisterForm: React.Dispatch<React.SetStateAction<Register>>;
  submitRegister: (registerForm: Register) => void;
  loginWithGoogle: (values: LoginGoogleContextType) => void;
  registerUser: (values: Register) => Promise<RegisterResponseType>;
};
