import { Button, Form, Input } from 'antd';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { loginGoogle } from '@/api/login';
import { useRouter } from 'next/router';
import { Login } from '@/types';

import type { NextPage } from 'next';
const LoginPage: NextPage = () => {
  const route = useRouter();
  const onFinish = () => {
    console.log();
  };

  const onSuccess = async (response: any) => {
    const credential: string = response.credential;

    const result = await loginGoogle({ token: credential });
    const { isCreated } = result.data.data;
    if (isCreated) route.push(`/`);
    else route.push(`/register`);
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
      onFinish={onFinish}
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

      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.log(`Login Failed`);
          }}
        />
      </GoogleOAuthProvider>
    </Form>
  );
};

export default LoginPage;
