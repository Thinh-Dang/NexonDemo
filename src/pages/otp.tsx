import { loginOtp } from '@/services/login.api';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Otp: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState<string>(`2633378748`);
  const [code, setCode] = useState<string>(`777777`);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await loginOtp({ phone: phone, code: code });
    localStorage.setItem(`access-token`, data.data.data.token);
    router.push(`/home`);
  };

  return (
    <section>
      <h1>Login with OTP</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" onClick={() => handleSubmit}>
          Login
        </button>
      </form>
    </section>
  );
};

export default Otp;
