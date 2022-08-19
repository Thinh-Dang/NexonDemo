import { ISettingWithInput } from '@/@type/components';
import { IChangeUserProfile } from '@/@type/params';
import { InputEnum } from '@/common/enums/enum';
import { Form } from 'antd';
import { FC, useCallback } from 'react';
import { InputContainer, MyButton, MyInput } from '../common';
import styleCss from './SettingWithInput.module.scss';

export const SettingWithInput: FC<ISettingWithInput> = ({
  defaultValue,
  type,
  isTextArea,
  title,
  onSubmit,
  name,
  settingType,
}) => {
  const handleSubmit = useCallback((value: IChangeUserProfile) => {
    onSubmit({ type: settingType, ...value });
  }, []);

  return (
    <Form className={styleCss.settingDescription} onFinish={handleSubmit}>
      <Form.Item
        name={name}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <InputContainer label={title}>
          <MyInput
            initValue={defaultValue}
            type={type}
            isTextArea={isTextArea}
          />
        </InputContainer>
      </Form.Item>
      <Form.Item>
        <MyButton title="Xong" type="submit" />
      </Form.Item>
    </Form>
  );
};
