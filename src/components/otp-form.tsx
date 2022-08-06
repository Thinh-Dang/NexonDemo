import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type Props = {
  onFinish: (data: any) => void;
};

function OtpForm({ onFinish }: Props) {
  return (
    <Form {...layout} onFinish={onFinish}>
      <Form.Item
        label="Otp"
        name="otp"
        rules={[{ required: true, message: `Please enter your OTP!` }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default OtpForm;
