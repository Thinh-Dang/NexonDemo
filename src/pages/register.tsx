import { Login } from '@/types';
import { GenderEnum } from '@/types/enum';
import { Button, Form, Input, Select } from 'antd';
import type { NextPage } from 'next';

const RegisterPage: NextPage = () => {
  const onFinish = () => {
    console.log();
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onRegister = () => {
    console.log();
  };
  const genderOptions = Object.keys(GenderEnum).map((gender) => {
    return { label: gender, value: gender };
  });
  const onGenderChange = () => {
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
      {/* phone */}
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: `Please input your phone number!` }]}
      >
        <Input style={{ width: `100%` }} />
      </Form.Item>

      {/* email */}
      <Form.Item
        name={`email`}
        label="Email"
        rules={[
          {
            required: true,
            message: `Fill valid email`,
            type: `email`,
          },
        ]}
      >
        <Input style={{ width: `100%` }} />
      </Form.Item>

      {/* fullname */}
      <Form.Item
        name="fullname"
        label="Fullname"
        rules={[
          {
            required: true,
            message: `Please input your full name`,
          },
        ]}
      >
        <Input placeholder="Please input your full name" />
      </Form.Item>

      {/* Nickname */}
      <Form.Item
        name="nickname"
        label="Nickname"
        rules={[
          {
            required: true,
            message: `Please input your nickname`,
          },
        ]}
      >
        <Input placeholder="Please input your nickname" />
      </Form.Item>

      {/* Gender */}
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
          options={genderOptions}
        />
      </Form.Item>

      {/* Register */}
      <Form.Item {...tailLayout}>
        <Button htmlType="button" onClick={onRegister}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegisterPage;
