import { Button } from '@/components/common/Button/Button';
import Content from '@/components/Content/Content';
import MyInput from '@/components/MyInput/MyInput';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { callAPIUpdateUser } from '@/redux/slice/userSlice';
import { inForUserSchema } from '@/Validation/Validations';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import imgInfor from '../../../public/assets/images/Login - Info.svg';
import styleScss from './UpdateInfor.module.scss';

const UpdateInfor = () => {
  const myState = useAppSelector((state: RootState) => state.userSlice);
  const [birthday, setBirthday] = useState<string>('18/12/1980');
  const [gender, setGender] = useState<string>('Other');

  const dispatch = useAppDispatch();

  const { handleBlur, errors, handleChange, values, handleSubmit, touched } =
    useFormik({
      initialValues: myState.inforUser,
      onSubmit: (value) => {
        const valueRequest: IFormRegisterPage = {
          ...value,
          birthday,
          gender,
          phone: myState.phone,
        };
        dispatch(callAPIUpdateUser(valueRequest));
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
            handleChange={handleChange}
            txtLabel="Họ tên"
            txtPlaceholder="Ví dụ: Trần Ngọc Tâm"
            isInput={true}
            name="name"
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
            handleChange={handleChange}
            txtLabel="Email"
            txtPlaceholder="Ví dụ: tamtn@hehe.com"
            isInput={true}
            name="email"
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
