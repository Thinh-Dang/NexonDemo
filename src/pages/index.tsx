import { CiCircleFilled } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 100 }}>
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <Link href="/register">
          <Button type="ghost">Register</Button>
        </Link>
        <Link href="/login">
          <Button type="ghost">Login</Button>
        </Link>
        <CiCircleFilled />
      </Space>
    </div>
  );
}
