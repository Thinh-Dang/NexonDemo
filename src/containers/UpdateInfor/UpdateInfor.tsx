import { IFormRegisterPage } from '@/@type/page';
import { IResponse } from '@/@type/responses';
import { ISignInWithSocial } from '@/@type/services';
import { Button } from '@/components/common/Button/Button';
import Content from '@/components/Content/Content';
import MyInput from '@/components/MyInput/MyInput';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  callApiSignUpWithSocial,
  callAPIUpdateUser,
  setStepLogin,
} from '@/redux/slice/userSlice';
import { inForUserSchema } from '@/Validation/Validations';
import { CloseCircleOutlined } from '@ant-design/icons';
import { message, Tag } from 'antd';
import { useFormik } from 'formik';
import { Session } from 'next-auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import imgInfor from '../../../public/assets/images/Login - Info.svg';
import styleScss from './UpdateInfor.module.scss';

type Props = {
  // eslint-disable-next-line react/require-default-props
  data?: Session;
};

const UpdateInfor = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const myState = useAppSelector((state: RootState) => state.userSlice);
  const [birthday, setBirthday] = useState<string>('18/12/1980');
  const [gender, setGender] = useState<string>('Other');
  const userLoginWithSocial = {
    name: data?.user?.name,
    email: data?.user?.email,
  };
  const loginWithPhone = async (value: INameAndEmail) => {
    const valueRequest: IFormRegisterPage = {
      ...value,
      birthday,
      gender,
      phone: myState.phone,
    };
    const result = (await dispatch(callAPIUpdateUser(valueRequest)))
      .payload as IResponse<string>;
    if (result.status) {
      message.success('Tạo tài khoản thành công');
      router.push('/finding');
    }
  };
  const loginWithSocial = async ({ name, email }: INameAndEmail) => {
    const valueRequest: ISignInWithSocial = {
      email,
      name,
      birthday,
      gender: gender.toUpperCase(),
      typeSocial: data?.typeSocial as string,
      accessToken: data?.accessToken as string,
      url: data?.user?.image as string,
    };
    const result = (await dispatch(callApiSignUpWithSocial(valueRequest)))
      .payload as IResponse<string>;
    if (result.status) {
      message.success('Cập nhật thông tin thành công');
      dispatch(setStepLogin());
    }
  };

  const { handleBlur, errors, handleChange, values, handleSubmit, touched } =
    useFormik({
      initialValues: data ? userLoginWithSocial : myState.inforUser,
      onSubmit: async (value: INameAndEmail | any) => {
        data
          ? loginWithSocial({
              email: data.user?.email as string,
              name: data.user?.name as string,
            })
          : loginWithPhone(value);
      },
      validationSchema: inForUserSchema,
    });
  const handdleChangeGender = (value: string) => {
    setGender(value);
  };

  const handdleChangeBirthday = (date: Date, dateString: string) => {
    setBirthday(dateString);
  };

  return (
    <div className={styleScss.inforUserMain}>
      <Image src={imgInfor} alt="Zodinet" />
      <Content
        classContent={styleScss.inforUserMain__content}
        contentTitle="Thông tin cá nhân"
        contentText="Vui lòng nhập thông tin cá nhân của bạn đẻ hoàn thành đăng nhập"
      />
      <form onSubmit={handleSubmit} className={styleScss.inforUserMain__form}>
        <div className={styleScss.inforUserMain__form__group}>
          <MyInput
            handleBlur={handleBlur}
            handleChange={(e) => {
              if (e.target.value.length > 50) {
                return;
              }
              handleChange(e);
            }}
            txtLabel="Họ tên"
            txtPlaceholder="Ví dụ: Trần Ngọc Tâm"
            isInput={true}
            name="name"
            value={values.name}
            disabled={data ? true : false}
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
          <MyInput
            handleBlur={handleBlur}
            handleChange={(e) => {
              if (e.target.value.length > 50) {
                return;
              }
              handleChange(e);
            }}
            txtLabel="Email"
            txtPlaceholder="Ví dụ: tamtn@hehe.com"
            isInput={true}
            name="email"
            value={values.email}
            disabled={data ? true : false}
          />
          {touched.email && errors.email && (
            <div>
              <Tag
                className={styleScss.inforUserMain__form__group__error__message}
                icon={<CloseCircleOutlined />}
                color="error"
              >
                {errors.email}
              </Tag>
            </div>
          )}
          <MyInput
            handleChangeDatePicker={handdleChangeBirthday}
            name="birthday"
            isDatePicker={true}
          />
          <MyInput
            handleChange={handdleChangeGender}
            name="gender"
            isSelection={true}
          />
        </div>
        <Button
          content="Xong"
          type="submit"
          btnClass={styleScss.inforUserMain__form__btn}
        />
      </form>
    </div>
  );
};

export default UpdateInfor;
