import { loginOtp } from '@/services/login.api';
import { Button } from 'antd';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Otp: NextPage = () => {
  const router = useRouter();
  const [phone, setPhone] = useState<string>(`2633378748`);
  const [code, setCode] = useState<string>(`777777`);

  const handleSubmit = async () => {
    if ((phone.length !== 0, code.length !== 0)) {
      const data = await loginOtp({ phone: phone, code: code });
      localStorage.setItem(`access-token`, data.data.data.token);
      router.push(`/home`);
    }
  };
  return (
    <section>
      <h1>Login with OTP</h1>
      <form>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="OTP"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Login
        </Button>
      </form>
    </section>
  );
};

export default Otp;
