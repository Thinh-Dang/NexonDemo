import { ISettingHobby } from '@/@type/components';
import { IUserHobbies } from '@/@type/params';
import { ICreateHobby } from '@/@type/services';
import { InputEnum } from '@/common/enums/enum';
import { pickColor } from '@/utils';
import { Form } from 'antd';
import { FC, useCallback, useRef, useState } from 'react';
import { InputContainer, MyButton, MyInput } from '../common';
import { ItemHobby } from '../ItemHobby/ItemHobby';
import styleCss from './SettingHobby.module.scss';

export const SettingHobby: FC<ISettingHobby> = ({
  hobbies,
  onCreate,
  onDetele,
}) => {
  const handleCreate = useCallback((value: ICreateHobby) => {
    onCreate(value);
  }, []);

  return (
    <div className={styleCss.settingHobby}>
      <div className={styleCss.settingHobby__hobbies}>
        {hobbies.map((item, index) => (
          <ItemHobby
            key={item.id}
            title={item.name}
            color={pickColor(index)}
            icon={'/assets/Close.svg'}
            value={item.id}
            onIconClick={onDetele}
          />
        ))}
      </div>
      <Form onFinish={handleCreate}>
        <Form.Item
          name={'name'}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputContainer label={'Sở thích'}>
            <MyInput initValue={''} type={InputEnum.TEXT} isTextArea={false} />
          </InputContainer>
        </Form.Item>
        <Form.Item>
          <MyButton title="Thêm mới" type="submit" />
        </Form.Item>
      </Form>
    </div>
  );
};
