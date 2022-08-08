import { ProviderEnum } from './../types/enum';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const authProviders = (provider: ProviderEnum) => {
  switch (provider) {
    case ProviderEnum.GOOGLE:
      return new GoogleAuthProvider();
    case ProviderEnum.FACEBOOK:
      return new FacebookAuthProvider();
  }
};
export default authProviders;
