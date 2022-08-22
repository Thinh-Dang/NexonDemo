import { ISettingHobby } from '@/@type/components';
import { IUserHobbies } from '@/@type/params';
import { IResponse } from '@/@type/responses';
import { useAppDispatch } from '@/redux';
import {
  createUserHobby,
  deleteUserHobby,
} from '@/redux/slice/userProfileSlice';
import { pickColor } from '@/utils';
import { message, Tag } from 'antd';
import { useFormik } from 'formik';
import { FC, useCallback } from 'react';
import { ItemHobby } from '../ItemHobby/ItemHobby';
import styleCss from './SettingHobby.module.scss';
import * as yup from 'yup';
import styleScss from '../../containers/UpdateInfor/UpdateInfor.module.scss';
import MyInput from '../MyInput/MyInput';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from '../common';
import buttonScss from '../../containers/ChangeSimpleInfo/ChangeSimpleInfo.module.scss';

export const SettingHobby: FC<ISettingHobby> = ({ hobbies }) => {
  const dispatch = useAppDispatch();

  const { handleBlur, errors, handleChange, handleSubmit, touched } = useFormik(
    {
      initialValues: {
        name: '',
      },
      onSubmit: async (value) => {
        const res = (await dispatch(createUserHobby(value)))
          .payload as IResponse<string | IUserHobbies>;
        if (!res.status) message.error('Create hobby fail');
      },
      validationSchema: yup.object({
        name: yup.string().required('Vui lòng nhập đủ thông tin'),
      }),
    },
  );

  const handleDelete = useCallback(async (value: string) => {
    const res = (
      await dispatch(
        deleteUserHobby({
          id: value,
        }),
      )
    ).payload as IResponse<string>;

    if (!res.status) alert('Delete hobby fail');
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
            onIconClick={handleDelete}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styleScss.inforUserMain__form}>
        <div>
          <MyInput
            handleBlur={handleBlur}
            handleChange={handleChange}
            txtLabel={'Sở thích'}
            isInput={true}
            defaultValue={''}
            name={'name'}
          />
          {touched.name && errors.name && (
            <div>
              <Tag
                className={styleScss.inforUserMain__form__group__error__message}
                icon={<CloseCircleOutlined />}
                color="error"
              >
                {errors.name}
              </Tag>
            </div>
          )}
        </div>
        <div className={buttonScss.changeSimpleInfo__button}>
          <Button
            content="Xong"
            type="submit"
            btnClass={styleScss.inforUserMain__form__btn}
          />
        </div>
      </form>
    </div>
  );
};
