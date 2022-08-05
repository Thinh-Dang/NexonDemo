import { verifyUserByEmail } from '@/services/login.api';
import { register } from '@/services/register.api';
import { CodeStatus, GenderEnum } from '@/types/enum';
import {
  LoginGoogleContextType,
  Register,
  UserContextType,
  UserProviderData,
  VerifyResponseType,
} from '@/types/user.type';
import React, { createContext, useState } from 'react';
const UserContext = createContext<UserContextType | string>(
  `useContext should be used inside ContextProvider`,
);

export const UserProvider: React.FC = ({ children }) => {
  // this state will be shared with all components
  const [registerForm, setRegisterForm] = useState<Register>({
    phone: ``,
    email: ``,
    fullname: ``,
    nickname: ``,
    gender: GenderEnum.female,
    avatar: ``,
    otp: `777777`,
  });
  const [userInfoForm, setUserInfoForm] = useState<Register>({
    phone: ``,
    email: ``,
    fullname: ``,
    nickname: ``,
    gender: `` || GenderEnum.female,
    avatar: ``,
    otp: `777777`,
  });
  const submitRegister = (values: Register) => {
    setRegisterForm(values);
  };
  const loginWithGoogle = async (values: LoginGoogleContextType) => {
    console.log(values);
    // const result = await loginGoogle(values);
    // if (result.code !== CodeStatus.Success) return result;
  };
  const registerUser = async (values: Register) => {
    const result = await register(values);
    if (
      result.status !== CodeStatus.Created &&
      result.data.code !== CodeStatus.Created
    )
      return {};
    return result.data.data;
  };
  const verifyUser = async (
    form: UserProviderData,
  ): Promise<VerifyResponseType> => {
    setUserInfoForm({
      email: form.email || ``,
      phone: form.phoneNumber || ``,
      nickname: form.displayName || ``,
      avatar: form.photoURL || ``,
      fullname: ``,
      otp: `777777`,
    });
    const result = await verifyUserByEmail({
      email: form.email as string,
    });
    if (result.status !== CodeStatus.Created) return { isNewUser: false };
    return result.data.data;
  };

  const value: UserContextType = {
    registerForm,
    userInfoForm,
    verifyUser,
    setRegisterForm,
    submitRegister,
    loginWithGoogle,
    registerUser,
  };
  return <UserContext.Provider {...{ value, children }} />;
};

export const useContext = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (typeof context === `string`) {
    throw new Error(context);
  }
  return context;
};
