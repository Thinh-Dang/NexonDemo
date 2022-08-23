import { IMatchingFriend } from '@/@type/services';
// Page Login
interface IFormLoginPage {
  phone: string;
}

interface IFormOtpPage {
  phone: string;
  code: string;
  email?: string;
}

// Page Register
interface IFormEnterPhonePage {
  phone: string;
}

interface IFormRegisterPage {
  phone: string;
  name: string;
  email: string;
  birthday: string;
  gender: string;
}

interface ILoginWithSocialPage {
  accessToken: string;
  typeSocial: string;
  userData: any;
}

// Page Map location
interface IFormCreateOrUpdateLocation {
  latitude: number;
  longtitude: number;
}

// page finding
interface IFormCreateUserBlock {
  blockedUserId: string;
}
interface IFormCreateUserLikeStack {
  toUserId: string;
}
// page matching
interface IFormDeleteUserLikeStack {
  ids: string[];
}
interface IMatchingPage {
  matching: IMatchingFriend[];
  matchingRef: RefObject<HTMLDivElement>;
  openMatchPagePopUp: () => void;
  closeMatchPagePopUp: () => void;
}
