import { IMyInput } from '@/@type/components';
import { Form, Input } from 'antd';
import { FC } from 'react';
import styleCss from './MyInput.module.scss';

export const MyInput: FC<IMyInput> = ({
  type,
  initValue,
  isTextArea,
  ...resProps
}) => {
  if (!isTextArea)
    return (
      <Input
        defaultValue={initValue}
        type={type}
        className={styleCss.myInput}
        {...resProps}
      />
    );
  return (
    <textarea
      defaultValue={initValue}
      className={styleCss.myInput}
      rows={8}
      {...resProps}
    />
  );
};
