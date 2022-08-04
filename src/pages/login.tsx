import { Login } from '@/types';
import { Button, Form, Input } from 'antd';
import { signIn } from 'next-auth/react';

import type { NextPage } from 'next';
const LoginPage: NextPage = () => {
  const onFinish = () => {
    console.log();
  };
  const onSignIn = () => {
    signIn();
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
