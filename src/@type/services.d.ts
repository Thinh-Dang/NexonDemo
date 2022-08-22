import {
  AlcoholEnum,
  EducationEnum,
  GenderEnum,
  MaritalStatusEnum,
  ReligionEnum,
  UpdateUserProfileEnum,
} from '../common/enums/enum';

// Service Login Api
interface ILoginGoogleContextType {
  token: string;
}

interface IRegister {
  phone: string;
  email: string;
  fullname: string;
  nickname: string;
  gender?: GenderEnum;
  avatar: string;
  otp: string;
}

interface IUserProviderData {
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface IVerifyResponse {
  isNewUser: boolean;
}

interface IRegisterResponse {
  token: string;
}

interface IUserContext {
  registerForm: IRegister;
  userInfoForm: IRegister;
  verifyUser: (values: IUserProviderData) => Promise<IVerifyResponse>;
  setRegisterForm: React.Dispatch<React.SetStateAction<IRegister>>;
  submitRegister: (registerForm: IRegister) => void;
  loginWithGoogle: (values: ILoginGoogleContext) => void;
  registerUser: (values: IRegister) => Promise<IRegisterResponse>;
}

interface ILogin {
  phone: string;
}

interface ILoginWithGoogle {
  token: string;
}

interface IResponses<T> {
  code: number;
  data: null | string | T | T[];
  message: string;
  error: string;
}

interface ILoginWithOtp {
  phone: string;
  code: string;
}

interface IVerifyUserByEmail {
  email: string;
}

interface IUpdateUserProfile {
  [s: string]: any;
  name?: string;
  birthday?: Date;
  gender?: GenderEnum;
  description?: string;
  children?: number;
  alcohol?: AlcoholEnum;
  religion?: ReligionEnum;
  height?: number;
  maritalStatus?: MaritalStatusEnum;
  education?: EducationEnum;
  purposeId?: string;
  type: UpdateUserProfileEnum;
}

interface ICreateHobby {
  name: string;
}

interface IDeleteHobby {
  id: string;
}

interface IUserBlock {
  id: string;
  userId: string;
  blockUserId: string;
  createdAt: Date;
}
interface IUserLikeStack {
  id: string;
  fromUserId: string;
  toUserId: string;
  createdAt: Date;
}
