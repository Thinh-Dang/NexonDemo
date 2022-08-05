import OtpForm from '@/components/otp-form';
import SignUpForm from '@/components/sign-up-form';
import { CreateUserDto } from '@/dto/create-user.dto';
import { ResponseToken } from '@/dto/response-token.dto';
import { ResponseDto } from '@/dto/response.dto';
import { CodeStatus, GenderEnum, Method } from '@/types/enum';
import type { NextPage } from 'next';
import { useState } from 'react';

const RegisterPage: NextPage = () => {
  const [step, setStep] = useState(1);
  const [formdata, setFormdata] = useState<CreateUserDto>({
    phone: `0987654321`,
    email: `abcd@gmail.com`,
    nickName: `nguyen van a`,
    fullName: `nguyen van a`,
    gender: GenderEnum.male,
    otp: `123456`,
  });

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
        nickname: formdata.nickName,
        fullname: formdata.fullName,
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
        <SignUpForm onFinish={onFinish} />
      ) : (
        <OtpForm onFinish={onFinishOtp} />
      )}
    </>
  );
};
export default RegisterPage;
