import { firebaseApp } from '@/config/firebase-config';
import { facebookProvider, googleProvider } from '@/config/providers';
import { useContext } from '@/context/UserContext';
import { Login } from '@/types';
import { Button, Form, Input } from 'antd';
import { getAuth, signInWithPopup } from 'firebase/auth';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
const LoginPage: NextPage = () => {
  const route = useRouter();
  const firebaseAuth = getAuth(firebaseApp);
  const { verifyUser } = useContext();
  const onSignInGoogle = async () => {
    const { user } = await signInWithPopup(firebaseAuth, googleProvider);
    const result = await verifyUser(user.providerData[0]);
    if (result.isNewUser) route.push(`/register`);
    else route.push(`/`);
  };
  const onSignInFacebook = async () => {
    const response = await signInWithPopup(firebaseAuth, facebookProvider);
    console.log(response);

    // const { refreshToken, providerData } = user;
    // console.log(`refreshToken`, refreshToken);
    // console.log(`providerData`, providerData);
  };

  // const sendOtp = () => {
  //   return <OtpForm onFinish={onFinishOtp} />;
  // };
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
        <Input style={{ width: `100%` }} />
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit" onClick={onSignInGoogle}>
          Sign In Google
        </Button>
        <Button type="primary" htmlType="submit" onClick={onSignInFacebook}>
          Sign In Facebook
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
