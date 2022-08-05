import { Form, Button } from 'antd';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Form.Item label=" " colon={false}>
        <Link href="/register">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Link>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Link href="/login">
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Link>
      </Form.Item>
    </>
  );
}
