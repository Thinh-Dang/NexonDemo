import { loginGoogle } from '@/services/login.api';
import { GenderEnum } from '@/types/enum';
import {
  LoginGoogleContextType,
  RegisterContextType,
  UserContextType,
} from '@/types/user.type';
import React, { createContext, useState } from 'react';
const UserContext = createContext<UserContextType | string>(
  `useContext should be used inside ContextProvider`,
);

export const UserProvider: React.FC = ({ children }) => {
  // this state will be shared with all components
  const [registerForm, setRegisterForm] = useState<RegisterContextType>({
    phone: ``,
    email: ``,
    fullname: ``,
    nickname: ``,
    gender: GenderEnum.female,
    avatar: ``,
  });
  const submitRegister = (values: RegisterContextType) => {
    setRegisterForm(values);
  };
  const loginWithGoogle = async (values: LoginGoogleContextType) => {
    const result = await loginGoogle(values);
    console.log(result);

    // if (result.code !== CodeStatus.Success) return result;
  };
  const value: UserContextType = {
    registerForm,
    setRegisterForm,
    submitRegister,
    loginWithGoogle,
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
