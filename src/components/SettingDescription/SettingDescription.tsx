import { ISettingDescription } from '@/@type/components';
import { FC } from 'react';
import { InputContainer } from '../common';

export const SettingDesctiption: FC<ISettingDescription> = ({
  defaultValue,
  setDescription,
}) => {
  return (
    <form>
      <InputContainer label={'Desctiption'}>
        <input />
      </InputContainer>
    </form>
  );
};
