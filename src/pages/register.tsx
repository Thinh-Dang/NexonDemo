import OtpForm from '@/components/otp-form';
import SignUpForm from '@/components/sign-up-form';
import { useContext } from '@/context/UserContext';
import { ResponseToken } from '@/dto/response-token.dto';
import { ResponseDto } from '@/dto/response.dto';
import { CodeStatus, Method } from '@/types/enum';
import { Register } from '@/types/user.type';
import type { NextPage } from 'next';
import { useState } from 'react';

const RegisterPage: NextPage = () => {
  const [step, setStep] = useState(1);
  const { userInfoForm } = useContext();
  const [formdata, setFormdata] = useState<Register>(userInfoForm);

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
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/otp/send-otp`, {
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
                alert(`Error occurs.`);
              }
            });
        } else {
          alert(data.error);
        }
      });
  };

  const onFinishOtp = (value: any) => {
    setFormdata((v) => ({ ...v, otp: value.otp }));

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
        }
      });
  };

  return (
    <>
      {step === 1 ? (
        <SignUpForm data={userInfoForm} onFinish={onFinish} />
      ) : (
        <OtpForm onFinish={onFinishOtp} />
      )}
    </>
  );
};
export default RegisterPage;
