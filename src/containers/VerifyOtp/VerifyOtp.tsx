import { IFormOtpPage } from '@/@type/page';
import { IResponse } from '@/@type/responses';
import {
  EXCEED_TIMES_WRONG_OTP,
  OTP_NOT_VALID,
  THIS_PHONE_NUMBER_IS_EXISTED,
} from '@/common/constantArlertErrors';
import { Button } from '@/components/common/Button/Button';
import Content from '@/components/Content/Content';
import MyInput from '@/components/MyInput/MyInput';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  callAPIVerifyCode,
  callAPIVerifyCodeLoginWithSocial,
  setIsValidOtp,
  setLoading,
} from '@/redux/slice/userSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { message, Spin } from 'antd';
import { Session } from 'next-auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import imgOtpPage from '../../../public/assets/images/img-otp.svg';
import styleScss from './VerifyOtp.module.scss';
import styleButtonLoading from '../../containers/SendOTP/SendOTP.module.scss';

type Props = {
  data?: Session;
};

const VerifyOtp = ({ data }: Props) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const router = useRouter();

  const myState = useAppSelector((state: RootState) => state.userSlice);

  const dispatch = useAppDispatch();

  const [otp, setOTP] = useState<string>();

  const [errOTP, setErrOTP] = useState<string>('');

  const handleLogiWithPhone = async (value: IFormOtpPage) => {
    const results = (await dispatch(callAPIVerifyCode(value)))
      .payload as IResponse<string>;
    dispatch(setLoading(false));
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
    dispatch(setLoading(false));
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
        onSubmit={(e) => {
          e.preventDefault();
          if (otp?.length != 6) {
            setErrOTP('Vui Lòng Nhập OTP đã được gửi');
          } else {
            dispatch(setLoading(true));
            const valuesRequest: IFormOtpPage = {
              phone: myState.phone,
              code: otp,
            };
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
            btnClass={
              myState.isLoading ? styleButtonLoading.sendOTP__btn__loading : ''
            }
            isHaveIcon={myState.isLoading ? false : true}
            type={myState.isLoading ? 'button' : 'submit'}
            content={
              myState.isLoading ? (
                <Spin style={{ color: '#fff' }} indicator={antIcon} />
              ) : (
                'Tiếp tục'
              )
            }
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
