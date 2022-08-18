import {
  AlcoholEnum,
  EducationEnum,
  GenderEnum,
  MaritalStatusEnum,
  ReligionEnum,
} from '@/common/enums/enum';

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

interface IChangeUserProfile {
  name?: string;
  avatar?: string;
  birthday?: Date;
  gender?: GenderEnum;
  description?: string;
  children?: number;
  alcohol?: AlcoholEnum;
  religion?: ReligionEnum;
  purposeId?: string;
  height?: number;
  maritalStatus?: MaritalStatusEnum;
  education?: EducationEnum;
}

interface IPurpose {
  id: string;
  title: string;
  description: string;
  image: string;
}

// For component My Selector
interface ISettingSource {
  value: string;
  name: string;
}
