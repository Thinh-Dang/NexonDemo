export type AuthContextType = {
  loading: boolean;
  socialSignInRedirect: (provider: ProviderEnum) => Promise<void>;
  socialSignInRedirectResult: () => Promise<AdditionalUserInfo | undefined>;
  verifyUser: (detailUser: AdditionalUserInfo) => Promise<string | undefined>;
  logoutAuthProvider: () => any;
};
