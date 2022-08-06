import OtpForm from '@/components/otp-form';
import SignUpForm from '@/components/sign-up-form';
import { useContext } from '@/context/UserContext';
import { ResponseToken } from '@/dto/response-token.dto';
import { ResponseDto } from '@/dto/response.dto';
import { CodeStatus, ErrorCode, Method } from '@/types/enum';
import { Register } from '@/types/user.type';
import type { NextPage } from 'next';
import React from 'react';
import { useState } from 'react';

const RegisterPage: NextPage = () => {
  const [step, setStep] = useState(1);
  const { userInfoForm } = useContext();
  const [formdata, setFormdata] = useState<Register>(userInfoForm);
  const signUpBtn = React.useRef<HTMLButtonElement>(null);

  const onFinish = (value: any) => {
    setFormdata({ ...value, otp: `` });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/verify-user`, {
      method: Method.post,
      body: JSON.stringify({
        phone: value.phone,
      }),
      headers: {
        'Content-Type': `application/json`,
      },
    })
      .then((response) => response.json())
      .then((data: ResponseDto<string>) => {
        if (data.code === CodeStatus.Success) {
          alert(`OTP has been sent to your phone.`);
          setStep(2);
        } else {
          alert(data.error);
        }
      });
  };

  const diableSignUp = () => {
    const btn = signUpBtn.current;
    if (btn) {
      btn.disabled = true;
      setTimeout(() => {
        btn.disabled = false;
      }, 60000);
    }
  };

  const onFinishOtp = (value: any) => {
    setFormdata((v: any) => ({ ...v, otp: value.otp }));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
      method: Method.post,
      body: JSON.stringify({
        email: formdata.email,
        nickname: formdata.nickname,
        fullname: formdata.fullname,
        phone: formdata.phone,
        gender: formdata.gender,
        otp: value.otp,
      }),
      headers: {
        'Content-Type': `application/json`,
      },
    })
      .then((response) => response.json())
      .then((data: ResponseDto<string | ResponseToken>) => {
        if (data.code === CodeStatus.Success) {
          const token = data.data as ResponseToken;
          alert(`your jwt token: ` + token.token);
        } else {
          alert(data.error);
          if (data.error === ErrorCode.EXCEED_TIMES_WRONG_OTP) {
            setStep(1);
            diableSignUp();
            alert(`You have to wait a few minutes to register again`);
          }
        }
      });
  };

  return (
    <>
      {step === 1 ? (
        <SignUpForm onFinish={onFinish} data={formdata} ref={signUpBtn} />
      ) : (
        <OtpForm onFinish={onFinishOtp} />
      )}
    </>
  );
};
export default RegisterPage;
