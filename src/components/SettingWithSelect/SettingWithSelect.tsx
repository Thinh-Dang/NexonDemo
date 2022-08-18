import { ISettingWithSelect } from '@/@type/components';
import { IChangeUserProfile } from '@/@type/params';
import { Form } from 'antd';
import { FC, useCallback } from 'react';
import { InputContainer, MyButton } from '../common';
import { MySelect } from '../common/Select/MySelect';
import styleCss from '../SettingWithInput/SettingWithInput.module.scss';

export const SettingWithSelect: FC<ISettingWithSelect> = ({
  defaultValue,
  title,
  source,
  name,
  settingType,
  onSubmit,
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
          <MySelect source={source} defaultValue={defaultValue} />
        </InputContainer>
      </Form.Item>
      <Form.Item>
        <MyButton title="Xong" type="submit" />
      </Form.Item>
    </Form>
  );
};
