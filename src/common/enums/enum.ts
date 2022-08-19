export enum Method {
  get = `get`,
  post = `post`,
  put = `put`,
  delete = `delete`,
}

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum CodeStatus {
  Success = 200,
  Created = 201,
  BadRequestException = 400,
  UnauthorizedException = 401,
  ForbiddenException = 403,
  NotFountException = 404,
  NotAcceptable = 406,
  Conflict = 409,
  InternalServerError = 500,
}

export enum ProviderEnum {
  GOOGLE = `Google`,
  FACEBOOK = `Facebook`,
}

export enum OperationTypeEnum {
  SIGNIN = `signIn`,
}

export enum ProviderIdEnum {
  GOOGLE = `google.com`,
  FACEBOOK = `facebook.com`,
}

export enum LocaleEnum {
  vi = `vi`,
}

export enum ErrorCode {
  EXCEED_TIMES_WRONG_OTP = `EXCEED_TIMES_WRONG_OTP`,
}

// Component ItemContentChat
export enum typeItemContentChat {
  FRIEND = 'friend',
  YOU = 'you',
}

export enum HTag {
  h2 = `h2`,
  h3 = `h3`,
}

export enum Color {
  clr_neutral_100 = '#2a2846',
  clr_neutral_80 = '#55536b',
  clr_neutral_65 = '#7f7e90',
  clr_neutral_40 = '#aaa9b5',
  clr_neutral_20 = '#d4d4da',
  clr_neutral_10 = '#eae9ed',
  clr_neutral_5 = '#f4f4f6',
  clr_neutral_0 = '#fff',
  clr_primary_100 = '#7a66c7',
  clr_primary_90 = '#7a56fe',
  clr_primary_80 = '#c5c2f3',
  clr_primary_65 = '#f9f9ff',
  clr_light_pink = '#fff0f0',
  clr_light_yellow = '#fff5ed',
  clr_light_blue = '#edf7ff',
  clr_light_green = '#e9fbf1',
}

export enum MaritalStatusEnum {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
}

export enum AlcoholEnum {
  SOMETIMES = 'sometime',
  USUALLY = 'usually',
  NEVER = 'never',
}

export enum ReligionEnum {
  BUDDHISM = 'buddhism',
  GOD = 'god',
  OTHER = 'other',
  NON_RELIGIONS = 'non-religion',
}

export enum EducationEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  HIGH_SCHOOL = 'high_school',
  COLLEGE = 'college',
  UNIVERSITY = 'university',
  OTHER = 'other',
}

export enum InputEnum {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
}

export enum OpenSettingProfile {
  REASON = 'reason',
  DESCRIPTION = 'description',
  HEIGHT = 'height',
  MARITAL = 'marital',
  ALCOHOL = 'alcohol',
  GENDER = 'gender',
  RELIGION = 'religion',
  EDUCATION = 'education',
  CHILD = 'child',
  HOBBIES = 'hobbies',
}

export enum UpdateUserProfileEnum {
  OTHER = 'other',
  GENDER = 'gender',
  DESCRIPTION = 'description',
  CHILDREN = 'children',
  ALCOHOL = 'alcohol',
  RELIGION = 'religion',
  HEIGHT = 'height',
  MARITAL_STATUS = 'maritalStatus',
  EDUCATION = 'education',
  PURPOSEID = 'purposeId',
}
