// Page Login
interface IFormLoginPage {
  phone: string;
}

interface IFormOtpPage {
  phone: string;
  verificationCode: string;
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
  avatar: string;
  is_verify: boolean;
}

interface ILoginWithSocialPage {
  accessToken: string;
  typeSocial: string;
  userData: any;
}
