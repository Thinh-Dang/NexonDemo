import { Form, Input, Select, Button } from 'antd';

type Props = {
  onFinish: (data: any) => void;
};
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function SignUpForm({ onFinish }: Props) {
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
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Full name"
        name="fullName"
        rules={[{ required: true, message: `Please enter your full name!` }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nick name"
        name="nickName"
        rules={[{ required: true, message: `Please enter your email!` }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: `Please select gender!` }]}
      >
        <Select placeholder="Select your gender">
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
