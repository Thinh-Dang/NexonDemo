// Page Login
interface IFormLoginPage {
  phone: string;
}

interface IFormOtpPage {
  phone: string;
  code: string;
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
