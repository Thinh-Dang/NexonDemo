import { AuthContextType } from '@/@type/context/auth-context';
import { IResponse } from '@/@type/interface/response';
import authProviders from '@/config/providers';
import { verifyUserByEmail } from '@/services/login.api';
import { ProviderEnum } from '@/types/enum';
import {
  AdditionalUserInfo,
  getAdditionalUserInfo,
  getRedirectResult,
  signInWithRedirect,
  UserCredential,
} from 'firebase/auth';
import React from 'react';
import { auth } from '../config/firebase-config';
const AuthContext = React.createContext<AuthContextType | string>(
  `useAuth should be used inside AuthProvider`,
);

const socialSignInRedirect = async (provider: ProviderEnum): Promise<void> => {
  const authProvider = authProviders(provider);
  await signInWithRedirect(auth, authProvider);
};

const socialSignInRedirectResult = async (): Promise<
  undefined | AdditionalUserInfo
> => {
  try {
    const result: UserCredential | null = await getRedirectResult(auth);
    if (result) {
      const detail: AdditionalUserInfo | null = getAdditionalUserInfo(result);
      if (!detail) return;
      return detail;
    }
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

const verifyUser = async (
  detailUser: AdditionalUserInfo,
): Promise<string | undefined> => {
  try {
    const verifyUser: IResponse = await verifyUserByEmail({
      email: detailUser?.profile?.email as string,
    });
    if (verifyUser.status) {
      if (verifyUser.data.isNewUser) {
        return `/register`;
      }
      return `/home`;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

const logoutAuthProvider = (): void => {
  console.log(`logout`);
  auth.signOut();
};

export const AuthProvider: React.FC = ({ children }) => {
  const [loading] = React.useState(false);

  const value: AuthContextType = {
    loading,
    socialSignInRedirect,
    socialSignInRedirectResult,
    verifyUser,
    logoutAuthProvider,
  };

  return <AuthContext.Provider {...{ value, children }} />;
};
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (typeof context === `string`) {
    throw new Error(context);
  }
  return context;
};
