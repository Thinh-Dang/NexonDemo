import { firebaseApp } from '@/config/firebase-config';
import { googleProvider } from '@/config/providers';
import { useContext } from '@/context/UserContext';
import { loginOtp } from '@/services/login.api';
import { Login } from '@/types';
import { Button, Form, Input } from 'antd';
import { getAuth, signInWithPopup } from 'firebase/auth';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
const LoginPage: NextPage = () => {
  const route = useRouter();
  const firebaseAuth = getAuth(firebaseApp);
  const [phone, setPhone] = useState<string>(`2633378748`);
  const [code, setCode] = useState<string>(`777777`);

  const { verifyUser } = useContext();
  const onSignInGoogle = async () => {
    const { user } = await signInWithPopup(firebaseAuth, googleProvider);
    const result = await verifyUser(user.providerData[0]);
    if (result.isNewUser) route.push(`/register`);
    else route.push(`/home`);
  };
  // const onSignInFacebook = async () => {
  // const response = await signInWithPopup(firebaseAuth, facebookProvider);
  // console.log(response);

  // const { refreshToken, providerData } = user;
  // console.log(`refreshToken`, refreshToken);
  // console.log(`providerData`, providerData);
  // };

  const handleSubmit = async () => {
    if ((phone.length !== 0, code.length !== 0)) {
      const data = await loginOtp({ phone: phone, code: code });
      localStorage.setItem(`access-token`, data.data.data.token);
      route.push(`/home`);
    }
  };
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
        <Button type="primary" htmlType="submit" onClick={onSignInGoogle}>
          Sign In Google
        </Button>
        {/* <Button type="primary" htmlType="submit" onClick={onSignInFacebook}>
          Sign In Facebook
        </Button> */}
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
