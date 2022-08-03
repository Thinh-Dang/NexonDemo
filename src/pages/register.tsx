import { Login } from '@/types';
import { Button, Form, Input } from 'antd';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const RegisterPage: NextPage = () => {
  const route = useRouter();
  const onFinish = () => {
    console.log();
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
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegisterPage;
