import { GenderEnum } from '@/types/enum';
import { Register } from '@/types/user.type';
import { Form, Input, Select, Button } from 'antd';

type Props = {
  data: Register;
  onFinish: (data: any) => void;
};
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const genderOptions = Object.keys(GenderEnum).map((gender) => {
  return { label: gender, value: gender };
});

export default function SignUpForm({ data, onFinish }: Props) {
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          { required: true, message: `Please input your phone!` },
          {
            validator: (_, value) =>
              /(0)(3|5|7|8|9)+([0-9]{8})\b/.test(value) &&
              /^[0-9]+$/.test(value)
                ? Promise.resolve()
                : Promise.reject(`Phone is not in correct form!`),
          },
        ]}
        initialValue={data.phone}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: `Please enter your email!` },
          { type: `email`, message: `Email is not in correct form!` },
        ]}
        initialValue={data.email}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Full name"
        name="fullname"
        rules={[{ required: true, message: `Please enter your full name!` }]}
        initialValue={data.fullname}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nick name"
        name="nickname"
        rules={[{ required: true, message: `Please enter your email!` }]}
        initialValue={data.nickname}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: `Please select gender!` }]}
      >
        <Select
          placeholder="Select your gender"
          options={genderOptions}
          defaultValue={data.gender}
        ></Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
