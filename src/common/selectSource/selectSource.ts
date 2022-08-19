import {
  ConvertAlcoholEnum,
  ConvertEducationEnum,
  ConvertGenderEnum,
  ConvertMaritalStatusEnum,
  ConvertReligionEnum,
} from '@/utils';
import { string } from 'yup';
import {
  AlcoholEnum,
  EducationEnum,
  GenderEnum,
  MaritalStatusEnum,
  ReligionEnum,
} from '../enums/enum';

export const MaritalSource = (): ISettingSource[] => {
  const values = Object.values(MaritalStatusEnum);

  const result: ISettingSource[] = [];

  for (let i = 0; i < values.length; i++) {
    const settingSource: ISettingSource = {
      value: values[i],
      name: ConvertMaritalStatusEnum(values[i]),
    };

    result.push(settingSource);
  }

  return result;
};

export const AlcoholSource = (): ISettingSource[] => {
  const values = Object.values(AlcoholEnum);

  const result: ISettingSource[] = [];

  for (let i = 0; i < values.length; i++) {
    const settingSource: ISettingSource = {
      value: values[i],
      name: ConvertAlcoholEnum(values[i]),
    };

    result.push(settingSource);
  }

  return result;
};

export const GenderSource = (): ISettingSource[] => {
  const values = Object.values(GenderEnum);

  const result: ISettingSource[] = [];

  for (let i = 0; i < values.length; i++) {
    const settingSource: ISettingSource = {
      value: values[i],
      name: ConvertGenderEnum(values[i]),
    };

    result.push(settingSource);
  }

  return result;
};

export const ReligionSource = (): ISettingSource[] => {
  const values = Object.values(ReligionEnum);

  const result: ISettingSource[] = [];

  for (let i = 0; i < values.length; i++) {
    const settingSource: ISettingSource = {
      value: values[i],
      name: ConvertReligionEnum(values[i]),
    };

    result.push(settingSource);
  }

  return result;
};

export const EducationSource = (): ISettingSource[] => {
  const values = Object.values(EducationEnum);

  const result: ISettingSource[] = [];

  for (let i = 0; i < values.length; i++) {
    const settingSource: ISettingSource = {
      value: values[i],
      name: ConvertEducationEnum(values[i]),
    };

    result.push(settingSource);
  }

  return result;
};
