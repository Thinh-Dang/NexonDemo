import { IResponse } from '@/@type/interface/response';
import { useAuth } from '@/context/AuthContext';
import { loginOtp } from '@/services/login.api';
import { Login } from '@/types';
import { ProviderEnum } from '@/types/enum';
import { Button, Form, Input } from 'antd';
import { AdditionalUserInfo } from 'firebase/auth';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const LoginPage: NextPage = () => {
  const route = useRouter();
  const [phone, setPhone] = useState<string>(`2633378748`);
  const [code, setCode] = useState<string>(`777777`);
  const { socialSignInRedirect, socialSignInRedirectResult, verifyUser } =
    useAuth();
  const onSignInSocial = (provider: ProviderEnum) => async () => {
    await socialSignInRedirect(provider);
  };

  const handleSubmit = async () => {
    if ((phone.length !== 0, code.length !== 0)) {
      const data: IResponse = await loginOtp({ phone: phone, code: code });

      localStorage.setItem(`access-token`, data.data.token);
      route.push(`/home`);
    }
  };
  useEffect(() => {
    const redirect = async () => {
      const result: AdditionalUserInfo | undefined =
        await socialSignInRedirectResult();
      if (result) {
        const path = await verifyUser(result);
        if (path) route.push(`${path}`);
      }
    };
    redirect();
  }, [route, socialSignInRedirectResult, verifyUser]);

  return (
    <Form<Login>
      name="login-form"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      // onFinish={}
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: `Please input your phone number!` }]}
      >
        <Input
          style={{ width: `100%` }}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="otp"
        label="Otp"
        rules={[{ required: true, message: `Please input your phone number!` }]}
      >
        <Input
          style={{ width: `100%` }}
          onChange={(e) => setCode(e.target.value)}
        />
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Sign In
        </Button>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={onSignInSocial(ProviderEnum.GOOGLE)}
        >
          Sign In Google
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          onClick={onSignInSocial(ProviderEnum.FACEBOOK)}
        >
          Sign In Facebook
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
