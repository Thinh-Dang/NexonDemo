import { Form, Button } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();
  const Google = () => {
    if (session) {
      return (
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    }
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  };
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
      <Google />
    </>
  );
}
