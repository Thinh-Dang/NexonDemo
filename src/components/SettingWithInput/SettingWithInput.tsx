import { ISettingWithInput } from '@/@type/components';
import { message, Tag } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Button } from '../common';
import styleScss from '../../containers/UpdateInfor/UpdateInfor.module.scss';
import { useFormik } from 'formik';
import { useAppDispatch } from '@/redux';
import { IUpdateUserProfile } from '@/@type/services';
import { updateUserProfile } from '@/redux/slice/userProfileSlice';
import { IResponse } from '@/@type/responses';
import * as yup from 'yup';
import MyInput from '../MyInput/MyInput';
import { CloseCircleOutlined } from '@ant-design/icons';
import buttonScss from '../../containers/ChangeSimpleInfo/ChangeSimpleInfo.module.scss';

export const SettingWithInput: FC<ISettingWithInput> = ({
  defaultValue,
  type,
  isTextArea,
  title,
  onClosePopUp,
  name,
  settingType,
}) => {
  const dispatch = useAppDispatch();

  const [num, setNum] = useState<number>();

  useEffect(() => {
    if (!isNaN(defaultValue as number)) {
      setNum(parseInt(defaultValue as string));
    }
  }, []);

  const { handleBlur, errors, handleChange, handleSubmit, touched } = useFormik(
    {
      initialValues: {
        [name]: defaultValue,
      },
      onSubmit: async (value) => {
        const keys = Object.keys(value);
        keys.forEach((item) => {
          value[item] = value[item].toString();
        });

        const valueRequest: IUpdateUserProfile = {
          ...value,
          type: settingType,
        };

        const res = (await dispatch(updateUserProfile(valueRequest)))
          .payload as IResponse<string | IUserProfile>;

        if (!res.status) message.error('Update fail');

        onClosePopUp();
      },
      validationSchema: yup.object({
        [name]: isTextArea
          ? yup.string().required('Vui lòng nhập đủ thông tin')
          : yup
              .number()
              .positive('Vui lòng nhập số dương.')
              .required('Vui lòng nhập đủ thông tin.'),
      }),
    },
  );

  return (
    <form onSubmit={handleSubmit} className={styleScss.inforUserMain__form}>
      <div>
        {isTextArea ? (
          <MyInput
            handleBlur={handleBlur}
            handleChange={handleChange}
            txtLabel={title}
            type={type}
            defaultValue={defaultValue}
            isTextArea={true}
            name={name}
          />
        ) : (
          <MyInput
            handleBlur={handleBlur}
            handleChange={handleChange}
            txtLabel={title}
            isInput={true}
            defaultValue={defaultValue}
            name={name}
          />
        )}

        {touched[name] && errors[name] && (
          <div>
            <Tag
              className={styleScss.inforUserMain__form__group__error__message}
              icon={<CloseCircleOutlined />}
              color="error"
            >
              {errors[name]}
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
  );
};
