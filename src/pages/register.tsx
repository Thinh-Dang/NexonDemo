import { useContext } from '@/context/UserContext';
import { GenderEnum } from '@/types/enum';
import { Register } from '@/types/user.type';
import { Button, Form, Input, Select } from 'antd';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RegisterPage: NextPage = () => {
  const { userInfoForm, registerUser } = useContext();
  const route = useRouter();
  const [form] = Form.useForm();
  const onFinish = async (values: Register) => {
    values[`otp`] = `777777`;
    const result = await registerUser(values);
    if (result.token) route.push(`/`);
    else route.push(`/login`);
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const genderOptions = Object.keys(GenderEnum).map((gender) => {
    return { label: gender, value: gender };
  });
  const onGenderChange = (value: string) => {
    if (value in GenderEnum) form.setFieldsValue({ gender: value });
  };
  useEffect(() => {
    form.setFieldsValue(userInfoForm);
  }, [form, userInfoForm]);

  return (
    <Form<Register>
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
        initialValue={userInfoForm.phone}
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
        initialValue={userInfoForm.email}
      >
        <Input style={{ width: `100%` }} disabled />
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
        initialValue={userInfoForm.fullname}
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
        initialValue={userInfoForm.nickname}
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
          value={
            genderOptions.find((gender) => gender.value === userInfoForm.gender)
              ?.value || null
          }
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        {/* Home */}
        <Link href="/">
          <Button htmlType="button">Home</Button>
        </Link>
        {/* Login */}
        <Link href="/login">
          <Button htmlType="button">Login</Button>
        </Link>
        {/* Register */}
        <Button htmlType="submit">Register</Button>
      </Form.Item>
    </Form>
  );
};
export default RegisterPage;
