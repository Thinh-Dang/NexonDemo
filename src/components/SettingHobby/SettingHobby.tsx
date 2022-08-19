import { FC, useCallback } from 'react';
import styleCss from './SettingHobby.module.scss';

import { Form } from 'antd';
import { pickColor } from '@/utils';
import { InputEnum } from '@/common/enums/enum';
import { ICreateHobby } from '@/@type/services';

import { ISettingHobby } from '@/@type/components';
import { ItemHobby } from '../ItemHobby/ItemHobby';
import { InputContainer, MyButton, MyInput } from '../common';

export const SettingHobby: FC<ISettingHobby> = ({
  hobbies,
  onCreate,
  onDelele,
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
            icon={'/assets/images/Close.svg'}
            value={item.id}
            onIconClick={onDelele}
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
