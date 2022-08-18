import React from 'react';
import { Button } from '@/components/common/Button/Button';
import Content from '@/components/Content/Content';
import MyInput from '@/components/MyInput/MyInput';
import { OTPValidationSchema } from '@/Validation/Validations';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import styleScss from './VerifyOtp.module.scss';
import imgOtpPage from '../../../public/assets/images/img-otp.svg';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { callAPIVerifyCode } from '@/redux/slice/userSlice';

type Props = {};

const VerifyOtp = (props: Props) => {
  const myState = useAppSelector((state: RootState) => state.userSlice);

  const dispatch = useAppDispatch();

  const { handleBlur, errors, handleChange, values, handleSubmit, touched } =
    useFormik({
      initialValues: { code: '' },
      onSubmit: (value) => {
        console.log(value);
        const valueRequest: IFormOtpPage = {
          phone: myState.phone,
          code: value.code.toString(),
        };
        dispatch(callAPIVerifyCode(valueRequest));
      },
      validationSchema: OTPValidationSchema,
    });

  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit} className={styleScss.verifyOtp}>
        <Image src={imgOtpPage} alt="Zodinet" />
        <Content
          classContent={styleScss.verifyOtp__content}
          contentTitle="Mã xác thực"
          contentText="Vui lòng nhập mã OTP được gửi về số điện thoại của bạn, để hoàn thành đăng nhập."
        />
        <MyInput
          handleBlur={handleBlur}
          name="code"
          handleChange={handleChange}
          isInput={false}
        />
        {touched.code && errors.code && (
          <Tag
            className={styleScss.verifyOtp__error__message}
            icon={<CloseCircleOutlined />}
            color="error"
          >
            {errors.code}
          </Tag>
        )}
        <Button
          btnClass=""
          isHaveIcon={true}
          type="submit"
          content="Tiếp tục"
        />
      </form>
    </>
  );
};

export default VerifyOtp;
