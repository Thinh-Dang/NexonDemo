import React, { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import Content from '@/components/Content/Content';
import MyInput from '@/components/MyInput/MyInput';
import { OTPValidationSchema } from '@/Validation/Validations';
import { CloseCircleOutlined } from '@ant-design/icons';
import { message, Tag } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import styleScss from './VerifyOtp.module.scss';
import imgOtpPage from '../../../public/assets/images/img-otp.svg';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  callAPIVerifyCode,
  callAPIVerifyCodeLoginWithSocial,
  setIsValidOtp,
} from '@/redux/slice/userSlice';
import { Session } from 'next-auth';
import { IResponse } from '@/@type/responses';
import { useRouter } from 'next/router';
import {
  EXCEED_TIMES_WRONG_OTP,
  OTP_NOT_VALID,
  THIS_PHONE_NUMBER_IS_EXISTED,
} from '@/common/constantArlertErrors';
import { IFormOtpPage } from '@/@type/page';

type Props = {
  data?: Session;
};

const VerifyOtp = ({ data }: Props) => {
  const router = useRouter();

  const myState = useAppSelector((state: RootState) => state.userSlice);

  const dispatch = useAppDispatch();

  const [otp, setOTP] = useState<string>();

  const [errOTP, setErrOTP] = useState<string>('');

  const handleLogiWithPhone = async (value: IFormOtpPage) => {
    console.log('value', value);
    const results = (await dispatch(callAPIVerifyCode(value)))
      .payload as IResponse<string>;
    if (results.status) {
      message.success('Xác thực OTP thành công');
    } else {
      switch (results.message) {
        case OTP_NOT_VALID:
          message.error('OTP không đúng');
          break;
        case THIS_PHONE_NUMBER_IS_EXISTED:
          message.error('Số điện thoại đã tồn tại');
          break;
        case EXCEED_TIMES_WRONG_OTP:
          dispatch(setIsValidOtp());
          message.error(
            'Bạn đã nhập sai 3 lần. Vui lòng quay lại sau 10 phút.',
          );
          break;
      }
    }
  };

  const handleLogiWithSocial = async (value: IFormOtpPage, email: string) => {
    value.email = email;

    const results = (await dispatch(callAPIVerifyCodeLoginWithSocial(value)))
      .payload as IResponse<string>;
    if (results.status) {
      if (data) {
        message.success('Tạo tài khoản thành công');
      } else {
        message.success('Xác thực OTP thành công');
      }
      router.push('/finding');
    } else {
      switch (results.message) {
        case OTP_NOT_VALID:
          message.error('OTP không đúng');
          break;
        case THIS_PHONE_NUMBER_IS_EXISTED:
          message.error('Số điện thoại đã tồn tại');
          break;
        case EXCEED_TIMES_WRONG_OTP:
          dispatch(setIsValidOtp());
          message.error(
            'Bạn đã nhập sai 3 lần. Vui lòng quay lại sau 10 phút.',
          );
          break;
      }
    }
  };

  const handleChangeOtp = (value: string) => {
    setOTP(value);
  };
  useEffect(() => {
    if (otp?.length === 6) {
      setErrOTP('');
    }
  }, [otp]);
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (otp?.length != 6) {
            setErrOTP('Vui Lòng Nhập OTP đã được gửi');
          } else {
            const valuesRequest: IFormOtpPage = {
              phone: myState.phone,
              code: otp,
            };
            console.log('valueRequest', valuesRequest);
            data
              ? handleLogiWithSocial(valuesRequest, data.user?.email as string)
              : handleLogiWithPhone(valuesRequest);
          }
        }}
        className={styleScss.verifyOtp}
      >
        <Image src={imgOtpPage} alt="Zodinet" />
        <Content
          classContent={styleScss.verifyOtp__content}
          contentTitle="Mã xác thực"
          contentText="Vui lòng nhập mã OTP được gửi về số điện thoại của bạn, để hoàn thành đăng nhập."
        />
        <MyInput
          errorOTP={errOTP}
          isInput={false}
          name="code"
          onSubmitOtp={handleChangeOtp}
        />

        {!myState.isValidOtp && (
          <Button
            btnClass=""
            isHaveIcon={true}
            type="submit"
            content="Tiếp tục"
          />
        )}
        {myState.isValidOtp && (
          <Button
            disabled
            style={{ opacity: '0.5' }}
            btnClass=""
            isHaveIcon={true}
            type="button"
            content="Tiếp tục"
          />
        )}
      </form>
    </>
  );
};

export default VerifyOtp;
