import { firebaseApp } from '@/config/firebase-config';
import { Login } from '@/types';
import { Button, Form, Input } from 'antd';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import type { NextPage } from 'next';
const LoginPage: NextPage = () => {
  const firebaseAuth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const onFinish = () => {
    console.log();
  };
  const onSignIn = async () => {
    await signInWithPopup(firebaseAuth, provider);
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
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit" onClick={onSignIn}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
