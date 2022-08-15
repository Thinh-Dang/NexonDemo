interface IParamGetAllUser {
  limit?: string;
  page?: string;
  email?: string;
  name?: string;
  username?: string;
}

interface IUserImages {
  id: string;
  url: string;
}

interface IUserHobbies {
  id: string;
  name: string;
}

interface IParamGetUserProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  birthday: Date;
  gender: GenderEnum;
  description: string;
  children: number;
  alcohol: AlcoholEnum;
  religion: ReligionEnum;
  purposeId: string;
  education: EducationEnum;
  isBlock: boolean;
  isVerify: boolean;
  album: IUserImages[];
  hobbies: IUserHobbies[];
}

interface IPurpose {
  id: string;
  title: string;
  description: string;
  image: string;
}
